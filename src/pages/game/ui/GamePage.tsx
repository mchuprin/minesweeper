import { useEffect } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { useGameConfig } from '../../../shared/store';
import { Counter } from '../../../shared/ui/counter/Counter';
import { MineTile } from '../../../shared/ui/tile/MineTile';
import { DIFFICULTY_CONFIG } from '../constants';
import styles from './GamePage.module.scss';
import { ClickMode, GameStatus } from '../../../shared/constants';

export const GamePage = () => {
	const difficulty = useGameConfig((state) => state.difficulty);
	const field = useGameConfig((state) => state.field);
	const gameStatus = useGameConfig((state) => state.gameStatus);
	const clickMode = useGameConfig((state) => state.clickMode);
	const generateField = useGameConfig((state) => state.generateField);
	const toggleTile = useGameConfig((state) => state.toggleTile);
	const toggleMode = useGameConfig((state) => state.toggleMode);

	useEffect(() => generateField(), []);

	const flaggedCount = field.filter((t) => t.flagged).length;
	const minesLeft = DIFFICULTY_CONFIG[difficulty].mines - flaggedCount;
	const isLost = gameStatus === 'lost';

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<Counter value={minesLeft} />
				<button type="button" className={styles.resetBtn} onClick={generateField}>
					<img
						src={gameStatus === GameStatus.PLAYING ? '/play.svg' : '/replay.svg'}
						alt="Reset"
						width={32}
						height={32}
					/>
				</button>
				<button
					type="button"
					className={classNames(styles.modeBtn, { [styles.disabled]: isLost }, [])}
					onClick={toggleMode}
					disabled={isLost}
				>
					<img
						src={clickMode === ClickMode.SHOW ? '/mine.svg' : '/flag.svg'}
						alt="Toggle mode"
						width={32}
						height={32}
					/>
				</button>
			</div>

			<div className={classNames(styles.field, {}, [styles[difficulty]])}>
				{field.map((tile, index) => (
					<MineTile
						key={`${difficulty}-${index}`}
						data={tile}
						index={index}
						onClick={() => toggleTile(index)}
					/>
				))}
			</div>
		</div>
	);
};
