import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	ClickMode,
	GameStatus,
	TileValue,
	TileValueByMineCount,
	TILE_NUMBER_MAP,
	DIFFICULTY,
	DIFFICULTY_CONFIG,
} from '@shared/constants';
import { getNeighbors } from '@shared/lib/getNeighbors';
import type { GameConfigState, TileData } from '@shared/types';

function checkWin(field: TileData[]): boolean {
	return field.every((tile) => tile.shown || tile.value === TileValue.MINE);
}

function floodFill(field: TileData[], index: number, cols: number, rows: number): TileData[] {
	const newField = [...field];
	const queue = [index];

	while (queue.length > 0) {
		const current = queue.shift()!;
		if (newField[current].shown || newField[current].flagged) continue;

		newField[current] = { ...newField[current], shown: true };

		if (newField[current].value === TileValue.EMPTY) {
			const neighbors = getNeighbors(current, cols, rows);
			for (const ni of neighbors) {
				if (!newField[ni].shown && !newField[ni].flagged) {
					queue.push(ni);
				}
			}
		}
	}

	return newField;
}

export const useGameConfig = create<GameConfigState>()(
	persist(
		(set, get) => ({
			clickMode: ClickMode.SHOW,
			toggleMode: () => {
				const { clickMode, gameStatus } = get();
				if (gameStatus === GameStatus.LOST || gameStatus === GameStatus.WON) return;
				const newValue = clickMode === ClickMode.FLAG ? ClickMode.SHOW : ClickMode.FLAG;
				set({ clickMode: newValue });
			},
			difficulty: DIFFICULTY.SMALL,
			gameStatus: GameStatus.IDLE,
			field: [],
			startTime: null,
			firstClickIndex: null,

			getElapsedTime: () => {
				const { startTime } = get();
				if (startTime === null) return 0;
				return Math.min(Math.floor((Date.now() - startTime) / 1000), 999);
			},

			reset: () => {
				const config = DIFFICULTY_CONFIG[get().difficulty];
				const totalTiles = config.cols * config.rows;
				const emptyField: TileData[] = Array.from({ length: totalTiles }, () => ({
					value: TileValue.EMPTY,
					flagged: false,
					shown: false,
				}));
				set({
					clickMode: ClickMode.SHOW,
					gameStatus: GameStatus.IDLE,
					field: emptyField,
					startTime: null,
					firstClickIndex: null,
				});
			},

			changeDifficulty: (newDif) => {
				set({ difficulty: newDif });
				get().generateField();
			},

			checkTile: (index: number) => {
				const { field, gameStatus } = get();
				if (gameStatus !== GameStatus.PLAYING) return;

				const tile = field[index];
				if (!tile.shown || tile.value === TileValue.MINE || tile.value === TileValue.EMPTY) return;

				const config = DIFFICULTY_CONFIG[get().difficulty];
				const neighbors = getNeighbors(index, config.cols, config.rows);
				const flaggedCount = neighbors.filter((ni) => field[ni].flagged).length;
				const numberValue = TILE_NUMBER_MAP[tile.value];

				if (flaggedCount !== numberValue) return;

				let newField = [...field];
				for (const ni of neighbors) {
					const neighborTile = newField[ni];
					if (neighborTile.shown || neighborTile.flagged) continue;

					if (neighborTile.value === TileValue.MINE) {
						newField[ni] = { ...neighborTile, shown: true, exploded: true };
						for (let i = 0; i < newField.length; i++) {
							const t = newField[i];
							if (t.value === TileValue.MINE && i !== ni) {
								newField[i] = { ...t, shown: true };
							}
							if (t.flagged && t.value !== TileValue.MINE) {
								newField[i] = { ...t, wrongFlag: true };
							}
						}
						set({ field: newField, gameStatus: GameStatus.LOST });
						return;
					}

					if (neighborTile.value === TileValue.EMPTY) {
						newField = floodFill(newField, ni, config.cols, config.rows);
					} else {
						newField[ni] = { ...neighborTile, shown: true };
					}
				}

				if (checkWin(newField)) {
					set({ field: newField, gameStatus: GameStatus.WON });
				} else {
					set({ field: newField });
				}
			},

			toggleTile: (index: number) => {
				const { field, clickMode, gameStatus } = get();

				if (gameStatus === GameStatus.LOST || gameStatus === GameStatus.WON) return;

				const config = DIFFICULTY_CONFIG[get().difficulty];
				const newField = [...field];
				const tile = newField[index];

				if (clickMode === ClickMode.SHOW) {
					if (tile.flagged || tile.shown) return;

					if (tile.value === TileValue.MINE) {
						newField[index] = { ...tile, shown: true, exploded: true };
						for (let i = 0; i < newField.length; i++) {
							const t = newField[i];
							if (t.value === TileValue.MINE && i !== index) {
								newField[i] = { ...t, shown: true };
							}
							if (t.flagged && t.value !== TileValue.MINE) {
								newField[i] = { ...t, wrongFlag: true };
							}
						}
						set({ field: newField, gameStatus: GameStatus.LOST });
						return;
					}

					if (tile.value === TileValue.EMPTY) {
						const updatedField = floodFill(newField, index, config.cols, config.rows);
						if (checkWin(updatedField)) {
							set({ field: updatedField, gameStatus: GameStatus.WON });
						} else {
							set({
								field: updatedField,
								gameStatus: GameStatus.PLAYING,
								startTime: get().startTime ?? Date.now(),
							});
						}
					} else {
						newField[index] = { ...tile, shown: true };
						if (checkWin(newField)) {
							set({ field: newField, gameStatus: GameStatus.WON });
						} else {
							set({
								field: newField,
								gameStatus: GameStatus.PLAYING,
								startTime: get().startTime ?? Date.now(),
							});
						}
					}
				} else {
					if (!tile.shown) {
						newField[index] = { ...tile, flagged: !tile.flagged };
						set({ field: newField });
					}
				}
			},

			generateField: (safeIndex?: number) => {
				const config = DIFFICULTY_CONFIG[get().difficulty];
				const totalTiles = config.cols * config.rows;

				const generatedField: TileData[] = Array.from({ length: totalTiles }, () => ({
					value: TileValue.EMPTY,
					flagged: false,
					shown: false,
				}));

				const safeNeighbors = new Set<number>();
				if (safeIndex !== undefined) {
					safeNeighbors.add(safeIndex);
					const neighbors = getNeighbors(safeIndex, config.cols, config.rows);
					for (const ni of neighbors) {
						safeNeighbors.add(ni);
					}
				}

				const availableIndices: number[] = [];
				for (let i = 0; i < totalTiles; i++) {
					if (!safeNeighbors.has(i)) {
						availableIndices.push(i);
					}
				}

				let currentIndex = availableIndices.length - 1;
				while (currentIndex > 0) {
					const randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--;
					[availableIndices[currentIndex], availableIndices[randomIndex]] = [
						availableIndices[randomIndex],
						availableIndices[currentIndex],
					];
				}

				const mineCount = Math.min(config.mines, availableIndices.length);
				for (let mine = 0; mine < mineCount; mine++) {
					generatedField[availableIndices[mine]].value = TileValue.MINE;
				}

				for (let row = 0; row < config.rows; row++) {
					for (let col = 0; col < config.cols; col++) {
						const idx = row * config.cols + col;
						if (generatedField[idx].value === TileValue.MINE) continue;

						let count = 0;
						const neighbors = getNeighbors(idx, config.cols, config.rows);
						for (const ni of neighbors) {
							if (generatedField[ni].value === TileValue.MINE) count++;
						}
						generatedField[idx].value = TileValueByMineCount[count];
					}
				}

				set({
					field: generatedField,
					gameStatus: GameStatus.PLAYING,
					firstClickIndex: safeIndex ?? null,
					startTime: Date.now(),
				});
			},
		}),
		{
			name: 'game-config',
			partialize: (state) => ({
				difficulty: state.difficulty,
			}),
		},
	),
);
