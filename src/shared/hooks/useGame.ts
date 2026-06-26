import { useCallback, useRef } from 'react';
import { useGameConfig } from '@shared/store';
import { DIFFICULTY_CONFIG, GameStatus } from '@shared/constants';
import { useTimer } from '@shared/hooks';
import { useLeaderboard } from '@shared/store';

export function useGame() {
	const difficulty = useGameConfig((s) => s.difficulty);
	const field = useGameConfig((s) => s.field);
	const gameStatus = useGameConfig((s) => s.gameStatus);
	const clickMode = useGameConfig((s) => s.clickMode);
	const generateField = useGameConfig((s) => s.generateField);
	const toggleTile = useGameConfig((s) => s.toggleTile);
	const toggleMode = useGameConfig((s) => s.toggleMode);
	const checkTile = useGameConfig((s) => s.checkTile);
	const getElapsedTime = useGameConfig((s) => s.getElapsedTime);

	const timer = useTimer();
	const recordWin = useLeaderboard((s) => s.recordWin);
	const recordLoss = useLeaderboard((s) => s.recordLoss);

	const flaggedCount = field.filter((t) => t.flagged).length;
	const minesLeft = DIFFICULTY_CONFIG[difficulty].mines - flaggedCount;
	const isGameOver = gameStatus === GameStatus.LOST || gameStatus === GameStatus.WON;

	const handleTileClick = useCallback(
		(index: number) => {
			const tile = useGameConfig.getState().field[index];
			if (tile?.shown) {
				checkTile(index);
			} else {
				toggleTile(index);
			}
		},
		[toggleTile, checkTile],
	);

	const handleReset = useCallback(() => {
		generateField();
	}, [generateField]);

	const handleContextMenu = useCallback((index: number) => {
		const { field: f, gameStatus: gs } = useGameConfig.getState();
		if (gs === GameStatus.LOST || gs === GameStatus.WON) return;
		const tile = f[index];
		if (tile.shown) return;
		const newField = [...f];
		newField[index] = { ...tile, flagged: !tile.flagged };
		useGameConfig.setState({ field: newField });
	}, []);

	const prevStatusRef = useRef(gameStatus);

	const recordResults = useCallback(() => {
		if (prevStatusRef.current === GameStatus.PLAYING && gameStatus === GameStatus.WON) {
			recordWin(difficulty, getElapsedTime());
		}
		if (prevStatusRef.current === GameStatus.PLAYING && gameStatus === GameStatus.LOST) {
			recordLoss(difficulty);
		}
		prevStatusRef.current = gameStatus;
	}, [gameStatus, difficulty, getElapsedTime, recordWin, recordLoss]);

	return {
		difficulty,
		field,
		gameStatus,
		clickMode,
		timer,
		minesLeft,
		isGameOver,
		generateField,
		toggleMode,
		handleTileClick,
		handleReset,
		handleContextMenu,
		recordResults,
	};
}
