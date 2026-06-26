import { useEffect } from 'react';
import { useGame } from '@shared/hooks';
import { GameHeader } from '@widgets/game-header/ui';
import { GameBoard } from '@widgets/game-board/ui';
import styles from './GamePage.module.scss';

export const GamePage = () => {
	const {
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
	} = useGame();

	useEffect(() => {
		if (gameStatus === 'idle') {
			generateField();
		}
	}, [gameStatus, generateField]);

	useEffect(() => {
		recordResults();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameStatus, timer]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'r' || e.key === 'R') {
				handleReset();
			}
			if (e.key === ' ') {
				e.preventDefault();
				toggleMode();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleReset, toggleMode]);

	return (
		<div className={styles.page}>
			<div className={styles.widget}>
				<GameHeader
					minesLeft={minesLeft}
					timer={timer}
					isGameOver={isGameOver}
					clickMode={clickMode}
					onReset={handleReset}
					onToggleMode={toggleMode}
				/>
				<GameBoard
					field={field}
					difficulty={difficulty}
					onClick={handleTileClick}
					onContextMenu={handleContextMenu}
				/>
			</div>
		</div>
	);
};
