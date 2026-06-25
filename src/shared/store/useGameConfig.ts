import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DIFFICULTY, DIFFICULTY_CONFIG } from '../../pages/game/constants';
import { ClickMode, TileValue, TileValueByMineCount } from '../constants';
import type { GameConfigState, TileData } from '../types';

export const useGameConfig = create<GameConfigState>()(
	persist(
		(set, get) => ({
			clickMode: 'flag',
			toggleMode: () => {
				const { clickMode, gameStatus } = get();
				if (gameStatus === 'lost') return;
				const newValue = clickMode === ClickMode.FLAG ? ClickMode.SHOW : ClickMode.FLAG;
				set({ clickMode: newValue });
			},
			difficulty: DIFFICULTY.SMALL,
			gameStatus: 'idle',
			field: [],
			checkTile: () => {
				// Пустой - открыть все вокруг него и
			},
			changeDifficulty: (newDif) => set({ difficulty: newDif }),
			toggleTile: (index: number) => {
				const { field, clickMode, gameStatus } = get();
				if (gameStatus === 'lost') return;

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

						set({ field: newField, gameStatus: 'lost' });
						return;
					}

					newField[index] = { ...tile, shown: true };

					if (tile.value === TileValue.EMPTY) {
						const config = DIFFICULTY_CONFIG[get().difficulty];

						const currentCoords = {
							col: index % config.rows,
							row: Math.floor(index / config.cols),
						};
						// Тот же уровень
						// Слева
						if (
							currentCoords.col - 1 >= 0 &&
							!newField[index - 1].shown &&
							!newField[index - 1].flagged
						) {
							newField[index - 1] = { ...newField[index - 1], shown: true };
						}
						// Справа
						if (
							currentCoords.col + 1 < config.cols &&
							!newField[index + 1].shown &&
							!newField[index + 1].flagged
						) {
							newField[index + 1] = { ...newField[index + 1], shown: true };
						}
						// Сверху
						if (currentCoords.row - 1 >= 0) {
							if (
								currentCoords.col - 1 >= 0 &&
								!newField[index - 10].shown &&
								!newField[index - 10].flagged
							) {
								newField[index - 10] = { ...newField[index - 10], shown: true };
							}
							// Справа
							if (
								currentCoords.col + 1 < config.cols &&
								!newField[index - 8].shown &&
								!newField[index - 8].flagged
							) {
								newField[index - 8] = { ...newField[index - 8], shown: true };
							}
							// Центр
							if (!newField[index - 9].shown && !newField[index - 9].flagged) {
								newField[index - 9] = { ...newField[index - 9], shown: true };
							}
						}

						// Снизу
						if (currentCoords.row + 1 < config.rows) {
							// Слева
							if (
								currentCoords.col - 1 >= 0 &&
								!newField[index + 8].shown &&
								!newField[index + 8].flagged
							) {
								newField[index + 8] = { ...newField[index + 8], shown: true };
							}
							// Справа
							if (
								currentCoords.col + 1 < config.cols &&
								!newField[index + 10].shown &&
								!newField[index + 10].flagged
							) {
								newField[index + 10] = { ...newField[index + 10], shown: true };
							}
							// Центр
							if (!newField[index + 9].shown && !newField[index + 9].flagged) {
								newField[index + 9] = { ...newField[index + 9], shown: true };
							}
						}
					}
				} else {
					if (!tile.shown) newField[index] = { ...tile, flagged: !tile.flagged };
				}
				set({ field: newField, gameStatus: 'playing' });
			},
			generateField: () => {
				const config = DIFFICULTY_CONFIG[get().difficulty];

				// Этап 1 - создаем пустую конфигурацию поля
				const generatedField: TileData[][] = Array.from({ length: config.rows }, () =>
					Array.from({ length: config.cols }, () => ({
						value: TileValue.EMPTY,
						flagged: false,
						shown: false,
					})),
				);

				// Этап 2 - расставляем мины
				const indexArray = Array.from({ length: config.cols * config.rows }, (_, index) => index);
				let currentIndex = indexArray.length - 1;

				while (currentIndex > 0) {
					const randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--;

					[indexArray[currentIndex], indexArray[randomIndex]] = [
						indexArray[randomIndex],
						indexArray[currentIndex],
					];
				}

				for (let mine = 0; mine < config.mines; mine++) {
					const mineIndex = indexArray[mine];
					generatedField[Math.floor(mineIndex / config.cols)][mineIndex % config.cols].value =
						TileValue.MINE;
				}

				// Этап 3 - Вычисляем количество мин вокруг каждой не мины
				for (let row = 0; row < config.rows; row++) {
					for (let col = 0; col < config.cols; col++) {
						if (generatedField[row][col].value === TileValue.MINE) continue;
						let mineCount = 0;
						// #Тот же уровень
						// Слева
						if (
							generatedField[row][col - 1] &&
							generatedField[row][col - 1].value === TileValue.MINE
						)
							mineCount++;
						// Справа
						if (
							generatedField[row][col + 1] &&
							generatedField[row][col + 1].value === TileValue.MINE
						)
							mineCount++;
						// #Верхний уровень
						if (generatedField[row - 1]) {
							// Слева
							if (
								generatedField[row - 1][col - 1] &&
								generatedField[row - 1][col - 1].value === TileValue.MINE
							)
								mineCount++;
							// Справа
							if (
								generatedField[row - 1][col + 1] &&
								generatedField[row - 1][col + 1].value === TileValue.MINE
							)
								mineCount++;
							// Центр
							if (
								generatedField[row - 1][col] &&
								generatedField[row - 1][col].value === TileValue.MINE
							)
								mineCount++;
						}

						// #Нижний уровень
						if (generatedField[row + 1]) {
							// Слева
							if (
								generatedField[row + 1][col - 1] &&
								generatedField[row + 1][col - 1].value === TileValue.MINE
							)
								mineCount++;
							// Справа
							if (
								generatedField[row + 1][col + 1] &&
								generatedField[row + 1][col + 1].value === TileValue.MINE
							)
								mineCount++;
							// Центр
							if (
								generatedField[row + 1][col] &&
								generatedField[row + 1][col].value === TileValue.MINE
							)
								mineCount++;
						}

						generatedField[row][col].value = TileValueByMineCount[mineCount];
					}
				}
				return set({ field: generatedField.flat(), gameStatus: 'playing' });
			},
		}),
		{ name: 'game-config' },
	),
);
