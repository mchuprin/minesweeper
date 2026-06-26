# Minesweeper

Классический Сапёр на React.

## Tech Stack

- React 19 + TypeScript 6
- Vite 8
- Zustand 5 (state + localStorage)
- react-router 7 (HashRouter)
- SCSS Modules

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` — dev сервер
- `pnpm build` — production build (tsc + vite)
- `pnpm lint` — ESLint + autofix

## How to Play

- **Left click** — открыть клетку
- **Right click** — поставить флаг
- **Click on revealed number** — chord (открыть соседей если флаги совпадают)
- **R** — сброс
- **Space** — переключить режим (show/flag)

## Structure

```
src/
├── app/           — роутер, стили
├── pages/         — MainPage, GamePage, LeaderboardPage
├── widgets/       — GameHeader, GameBoard
├── shared/        — hooks, store, constants, types, ui, lib
```
