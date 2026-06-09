import type { TileValueType } from "../../../shared/constants";
import type { DIFFICULTY } from "../constants";

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
}


export type GameConfigState = {
    difficulty: Difficulty,
    field: TileValueType[][]
    changeDifficulty: (newDif: Difficulty) => void
    generateField: () => void
}