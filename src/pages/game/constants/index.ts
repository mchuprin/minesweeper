import type { Difficulty, GameConfig } from "../types";

export const DIFFICULTY = {
  SMALL: "small",
  MEDIUM: "medium", 
  LARGE: "large",
} as const;

export const DIFFICULTY_CONFIG: Record<Difficulty, GameConfig> = {
  [DIFFICULTY.SMALL]: { rows: 9, cols: 9, mines: 10 },
  [DIFFICULTY.MEDIUM]: { rows: 16, cols: 16, mines: 40 },
  [DIFFICULTY.LARGE]: { rows: 16, cols: 30, mines: 99 },
};