import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Difficulty } from '@shared/types';

export interface DifficultyRecord {
	bestTime: number | null;
	gamesPlayed: number;
	gamesWon: number;
}

export interface LeaderboardState {
	records: Record<Difficulty, DifficultyRecord>;
	recordWin: (difficulty: Difficulty, time: number) => void;
	recordLoss: (difficulty: Difficulty) => void;
	clearRecords: () => void;
}

const initialRecord: DifficultyRecord = {
	bestTime: null,
	gamesPlayed: 0,
	gamesWon: 0,
};

const INITIAL_STATE: Record<Difficulty, DifficultyRecord> = {
	small: { ...initialRecord },
	medium: { ...initialRecord },
	large: { ...initialRecord },
};

export const useLeaderboard = create<LeaderboardState>()(
	persist(
		(set, get) => ({
			records: INITIAL_STATE,
			recordWin: (difficulty, time) => {
				const { records } = get();
				const prev = records[difficulty];
				const newBest = prev.bestTime === null ? time : Math.min(prev.bestTime, time);
				set({
					records: {
						...records,
						[difficulty]: {
							bestTime: newBest,
							gamesPlayed: prev.gamesPlayed + 1,
							gamesWon: prev.gamesWon + 1,
						},
					},
				});
			},
			recordLoss: (difficulty) => {
				const { records } = get();
				const prev = records[difficulty];
				set({
					records: {
						...records,
						[difficulty]: {
							...prev,
							gamesPlayed: prev.gamesPlayed + 1,
						},
					},
				});
			},
			clearRecords: () => set({ records: INITIAL_STATE }),
		}),
		{ name: 'minesweeper-leaderboard' },
	),
);
