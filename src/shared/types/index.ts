import type { DIFFICULTY } from '../../pages/game/constants';
import type { ClickMode, GameStatus, TileValue } from '../constants';

export type TileValueType = (typeof TileValue)[keyof typeof TileValue];

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export interface GameConfig {
	rows: number;
	cols: number;
	mines: number;
}

export interface TileData {
	value: TileValueType;
	flagged: boolean;
	shown: boolean;
	exploded?: boolean;
	wrongFlag?: boolean;
}

export type ClickMode = (typeof ClickMode)[keyof typeof ClickMode];

export type GameConfigState = {
	clickMode: ClickMode;
	difficulty: Difficulty;
	gameStatus: GameStatus;
	field: TileData[];
	checkTile: () => void;
	toggleMode: () => void;
	changeDifficulty: (newDif: Difficulty) => void;
	generateField: () => void;
	toggleTile: (index: number) => void;
};
