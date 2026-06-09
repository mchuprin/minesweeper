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
    EMPTY: 'empty'
} as const

export const TileValueByMineCount: Record<number, Exclude<TileValueType, typeof TileValue.FLAG | typeof TileValue.MINE>> = {
    0: TileValue.EMPTY,
    1: TileValue.ONE,
    2: TileValue.TWO,
    3: TileValue.THREE,
    4: TileValue.FOUR,
    5: TileValue.FIVE,
    6: TileValue.SIX,
    7: TileValue.SEVEN,
    8: TileValue.EIGHT,
} as const

export const TileAssetsUrl: Record<Exclude<TileValueType, typeof TileValue.EMPTY>, string> = {
    [TileValue.ONE]: '/ma-counter-1.svg',
    [TileValue.TWO]: '/ma-counter-2.svg',
    [TileValue.THREE]: '/ma-counter-3.svg',
    [TileValue.FOUR]: '/ma-counter-4.svg',
    [TileValue.FIVE]: '/ma-counter-5.svg',
    [TileValue.SIX]: '/ma-counter-6.svg',
    [TileValue.SEVEN]: '/ma-counter-7.svg',
    [TileValue.EIGHT]: '/ma-counter-8.svg',
    [TileValue.MINE]: '/mine.svg',
    [TileValue.FLAG]: '/flag.svg',
} as const

export type TileValueType = (typeof TileValue)[keyof typeof TileValue];