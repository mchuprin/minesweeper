import { createHashRouter } from 'react-router';
import { GamePage } from '@pages/game/ui/GamePage';
import { MainPage } from '@pages/main/ui/MainPage';
import { LeaderboardPage } from '@pages/leaderboard/ui/LeaderboardPage';

export const router = createHashRouter([
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/game',
		element: <GamePage />,
	},
	{
		path: '/leaderboard',
		element: <LeaderboardPage />,
	},
]);
