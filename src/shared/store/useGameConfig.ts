import { create } from 'zustand'
import { DIFFICULTY, DIFFICULTY_CONFIG } from '../../pages/game/constants'
import type { GameConfigState } from '../../pages/game/types'
import { TileValue, TileValueByMineCount } from '../constants'

export const useGameConfig = create<GameConfigState>((set, get) => ({
    difficulty: DIFFICULTY.SMALL,
    field: [],
    changeDifficulty: (newDif) => set({ difficulty: newDif}),
    generateField: () => {
        const config = DIFFICULTY_CONFIG[get().difficulty]

        // Этап 1 - создаем пустую конфигурацию поля
        const generatedField = Array.from({ length: config.rows }, () => Array(config.cols).fill(TileValue.EMPTY));

        // Этап 2 - расставляем мины
        const indexArray = Array.from({ length: config.cols * config.rows }, (_, index) => index)
        let currentIndex = indexArray.length - 1

        while (currentIndex > 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [indexArray[currentIndex], indexArray[randomIndex]] = [indexArray[randomIndex], indexArray[currentIndex]];
        }

        for (let mine = 0; mine < config.mines; mine++) {
            const mineIndex = indexArray[mine]
            generatedField[Math.floor(mineIndex / config.cols)][mineIndex % config.cols] = TileValue.MINE
        }

        // Этап 3 - Вычисляем количество мин вокруг каждой не мины
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                if (generatedField[row][col] === TileValue.MINE) continue
                let mineCount = 0
                // #Тот же уровень
                // Слева
                if (generatedField[row][col - 1] && generatedField[row][col - 1] === TileValue.MINE) mineCount++
                // Справа
                if (generatedField[row][col + 1] && generatedField[row][col + 1] === TileValue.MINE) mineCount++
                // #Верхний уровень
                if (generatedField[row - 1]) {
                    // Слева
                    if (generatedField[row - 1][col - 1] && generatedField[row - 1][col - 1] === TileValue.MINE) mineCount++
                    // Справа
                    if (generatedField[row - 1][col + 1] && generatedField[row - 1][col + 1] === TileValue.MINE) mineCount++
                    // Центр
                    if (generatedField[row - 1][col] && generatedField[row - 1][col] === TileValue.MINE) mineCount++
                }

                // #Нижний уровень
                if (generatedField[row + 1]) {
                    // Слева
                    if (generatedField[row + 1][col - 1] && generatedField[row + 1][col - 1] === TileValue.MINE) mineCount++
                    // Справа
                    if (generatedField[row + 1][col + 1] && generatedField[row + 1][col + 1] === TileValue.MINE) mineCount++
                    // Центр
                    if (generatedField[row + 1][col] && generatedField[row + 1][col] === TileValue.MINE) mineCount++
                }

                generatedField[row][col] = TileValueByMineCount[mineCount]
            }
        }
        return set({ field: generatedField.flat() })
    }
}))