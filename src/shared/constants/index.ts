import type { TileValueType, GameConfig } from '../types';

export const GameStatus = {
	IDLE: 'idle',
	PLAYING: 'playing',
	WON: 'won',
	LOST: 'lost',
} as const;

export const TileValue = {
	ONE: 'one',
	TWO: 'two',
	THREE: 'three',
	FOUR: 'four',
	FIVE: 'five',
	SIX: 'six',
	SEVEN: 'seven',
	EIGHT: 'eight',
	MINE: 'mine',
	FLAG: 'flag',
	EMPTY: 'empty',
	WRONG_FLAG: 'wrongFlag',
} as const;

export const TileValueByMineCount: Record<
	number,
	Exclude<TileValueType, typeof TileValue.FLAG | typeof TileValue.MINE>
> = {
	0: TileValue.EMPTY,
	1: TileValue.ONE,
	2: TileValue.TWO,
	3: TileValue.THREE,
	4: TileValue.FOUR,
	5: TileValue.FIVE,
	6: TileValue.SIX,
	7: TileValue.SEVEN,
	8: TileValue.EIGHT,
} as const;

const b = import.meta.env.BASE_URL;

export const TileAssetsUrl: Record<Exclude<TileValueType, typeof TileValue.EMPTY>, string> = {
	[TileValue.ONE]: `${b}ma-counter-1.svg`,
	[TileValue.TWO]: `${b}ma-counter-2.svg`,
	[TileValue.THREE]: `${b}ma-counter-3.svg`,
	[TileValue.FOUR]: `${b}ma-counter-4.svg`,
	[TileValue.FIVE]: `${b}ma-counter-5.svg`,
	[TileValue.SIX]: `${b}ma-counter-6.svg`,
	[TileValue.SEVEN]: `${b}ma-counter-7.svg`,
	[TileValue.EIGHT]: `${b}ma-counter-8.svg`,
	[TileValue.MINE]: `${b}mine.svg`,
	[TileValue.FLAG]: `${b}flag.svg`,
	[TileValue.WRONG_FLAG]: `${b}flag.svg`,
};

export const ClickMode = {
	SHOW: 'show',
	FLAG: 'flag',
} as const;

export const TILE_NUMBER_MAP: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
};

export const DIFFICULTY = {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
} as const;

export const DIFFICULTY_CONFIG: Record<string, GameConfig> = {
	[DIFFICULTY.SMALL]: { rows: 9, cols: 9, mines: 10 },
	[DIFFICULTY.MEDIUM]: { rows: 16, cols: 16, mines: 40 },
	[DIFFICULTY.LARGE]: { rows: 16, cols: 30, mines: 99 },
};
