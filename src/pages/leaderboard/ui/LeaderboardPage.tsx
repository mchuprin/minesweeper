import { useNavigate } from 'react-router';
import { useLeaderboard } from '@shared/store';
import { DIFFICULTY } from '@shared/constants';
import type { Difficulty } from '@shared/types';
import styles from './LeaderboardPage.module.scss';

const DIFFICULTIES: { key: Difficulty; label: string }[] = [
	{ key: DIFFICULTY.SMALL, label: 'Small (9×9)' },
	{ key: DIFFICULTY.MEDIUM, label: 'Medium (16×16)' },
	{ key: DIFFICULTY.LARGE, label: 'Large (16×30)' },
];

export const LeaderboardPage = () => {
	const navigate = useNavigate();
	const records = useLeaderboard((s) => s.records);
	const clearRecords = useLeaderboard((s) => s.clearRecords);

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.title}>Leaderboard</h1>

				<div className={styles.table}>
					<div className={`${styles.row} ${styles.headerRow}`}>
						<span className={styles.cell}>Level</span>
						<span className={styles.cell}>Best Time</span>
						<span className={styles.cell}>Win Rate</span>
					</div>

					{DIFFICULTIES.map((d) => {
						const r = records[d.key];
						const winRate =
							r.gamesPlayed > 0 ? `${Math.round((r.gamesWon / r.gamesPlayed) * 100)}%` : '—';
						const bestTime = r.bestTime !== null ? `${r.bestTime}s` : '—';
						return (
							<div key={d.key} className={styles.row}>
								<span className={styles.cell}>{d.label}</span>
								<span className={styles.cell}>{bestTime}</span>
								<span className={styles.cell}>{winRate}</span>
							</div>
						);
					})}
				</div>

				<div className={styles.actions}>
					<button type="button" className={styles.backBtn} onClick={() => navigate('/')}>
						Back to Menu
					</button>
					<button type="button" className={styles.clearBtn} onClick={clearRecords}>
						Clear Records
					</button>
				</div>
			</div>
		</div>
	);
};
