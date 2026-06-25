import { createHashRouter } from 'react-router';
import { GamePage } from '../../pages/game/ui/GamePage';

export const router = createHashRouter([
	{
		path: '/',
		element: <GamePage />,
	},
]);
