export type TileValueType =
	| 'one'
	| 'two'
	| 'three'
	| 'four'
	| 'five'
	| 'six'
	| 'seven'
	| 'eight'
	| 'mine'
	| 'flag'
	| 'empty'
	| 'wrongFlag';

export type Difficulty = 'small' | 'medium' | 'large';

export type GameStatusType = 'idle' | 'playing' | 'won' | 'lost';

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

export type ClickModeType = 'show' | 'flag';

export type GameConfigState = {
	clickMode: ClickModeType;
	difficulty: Difficulty;
	gameStatus: GameStatusType;
	field: TileData[];
	startTime: number | null;
	firstClickIndex: number | null;
	checkTile: (index: number) => void;
	toggleMode: () => void;
	changeDifficulty: (newDif: Difficulty) => void;
	generateField: (safeIndex?: number) => void;
	toggleTile: (index: number) => void;
	getElapsedTime: () => number;
	reset: () => void;
};
