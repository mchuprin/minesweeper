import { useNavigate } from 'react-router';
import { useGameConfig } from '@shared/store';
import { DIFFICULTY } from '@shared/constants';
import type { Difficulty } from '@shared/types';
import styles from './MainPage.module.scss';

const DIFFICULTIES: { key: Difficulty; label: string; grid: string }[] = [
	{ key: DIFFICULTY.SMALL, label: 'Small', grid: '9×9 · 10 mines' },
	{ key: DIFFICULTY.MEDIUM, label: 'Medium', grid: '16×16 · 40 mines' },
	{ key: DIFFICULTY.LARGE, label: 'Large', grid: '16×30 · 99 mines' },
];

export const MainPage = () => {
	const navigate = useNavigate();
	const difficulty = useGameConfig((s) => s.difficulty);
	const changeDifficulty = useGameConfig((s) => s.changeDifficulty);
	const reset = useGameConfig((s) => s.reset);

	const handleStart = () => {
		reset();
		navigate('/game');
	};

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.title}>Minesweeper</h1>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Difficulty</h2>
					<div className={styles.difficulties}>
						{DIFFICULTIES.map((d) => (
							<button
								key={d.key}
								type="button"
								className={`${styles.diffBtn} ${difficulty === d.key ? styles.active : ''}`}
								onClick={() => changeDifficulty(d.key)}
							>
								<span className={styles.diffLabel}>{d.label}</span>
								<span className={styles.diffGrid}>{d.grid}</span>
							</button>
						))}
					</div>
				</div>

				<button type="button" className={styles.startBtn} onClick={handleStart}>
					Start Game
				</button>

				<button
					type="button"
					className={styles.leaderboardBtn}
					onClick={() => navigate('/leaderboard')}
				>
					Leaderboard
				</button>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>How to Play</h2>
					<ul className={styles.rules}>
						<li>Left click to reveal a tile</li>
						<li>Right click to place a flag</li>
						<li>Click a revealed number to chord</li>
						<li>
							<strong>R</strong> — reset, <strong>Space</strong> — toggle mode
						</li>
						<li>Reveal all safe tiles to win!</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
