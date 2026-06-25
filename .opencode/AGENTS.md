# Project Configuration for opencode

## Project Overview
Minesweeper game built with React, TypeScript, Vite, Zustand, and FSD architecture.

## Code Style Preferences
- Use tabs for indentation (tabWidth: 2)
- Single quotes
- Trailing commas: all
- Print width: 100
- Semi-colons: true

## Architecture Rules (FSD)
- `src/shared/` - shared utilities, constants, types, UI components
- `src/entities/` - business entities (game, tile)
- `src/features/` - features
- `src/widgets/` - UI widgets
- `src/pages/` - pages
- `src/app/` - app providers, router

## Linting/TypeScript
- ESLint with Prettier integration
- Strict TypeScript config (noUnusedLocals, noUnusedParameters, erasableSyntaxOnly)
- Run `npm run lint` before commits

## Store (Zustand)
- Single store: `useGameConfig` in `src/shared/store/useGameConfig.ts`
- Persist to localStorage with name 'game-config'
- Field is flat array of TileData objects

## Key Files
- `src/shared/store/useGameConfig.ts` - main game store
- `src/shared/constants/index.ts` - TileValue, ClickMode, TileAssetsUrl
- `src/shared/types/index.ts` - TileData, GameConfigState, Difficulty
- `src/pages/game/constants/index.ts` - DIFFICULTY, DIFFICULTY_CONFIG

## Game Logic
- `generateField()` - creates minefield with proper mine placement
- `toggleTile(index)` - handles click/flag logic
- Empty cell reveal needs recursive flood-fill (BFS/DFS)
- Field stored as flat array, cols/rows from DIFFICULTY_CONFIG

## Do Not
- Don't create new directories without asking
- Don't refactor architecture without explicit request
- Don't add comments unless requested
- Don't change FSD structure