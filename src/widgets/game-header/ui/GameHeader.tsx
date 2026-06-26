import { useNavigate } from 'react-router';
import { classNames } from '@shared/lib/classNames/classNames';
import { Counter } from '@shared/ui';
import { ClickMode } from '@shared/constants';
import styles from './GameHeader.module.scss';

interface GameHeaderProps {
	minesLeft: number;
	timer: number;
	isGameOver: boolean;
	clickMode: string;
	onReset: () => void;
	onToggleMode: () => void;
}

export const GameHeader = ({
	minesLeft,
	timer,
	isGameOver,
	clickMode,
	onReset,
	onToggleMode,
}: GameHeaderProps) => {
	const navigate = useNavigate();

	return (
		<div className={styles.header}>
			<button type="button" className={styles.menuBtn} onClick={() => navigate('/')}>
				Menu
			</button>
			<Counter value={minesLeft} />
			<button type="button" className={styles.btn} onClick={onReset}>
				<img
					src={
						isGameOver
							? `${import.meta.env.BASE_URL}replay.svg`
							: `${import.meta.env.BASE_URL}play.svg`
					}
					alt="Reset"
					width={32}
					height={32}
				/>
			</button>
			<Counter value={timer} />
			<button
				type="button"
				className={classNames(styles.btn, { [styles.disabled]: isGameOver }, [])}
				onClick={onToggleMode}
				disabled={isGameOver}
			>
				<img
					src={
						clickMode === ClickMode.SHOW
							? `${import.meta.env.BASE_URL}mine.svg`
							: `${import.meta.env.BASE_URL}flag.svg`
					}
					alt="Toggle mode"
					width={32}
					height={32}
				/>
			</button>
		</div>
	);
};
