import { createBrowserRouter } from "react-router";
import { GamePage } from "../../pages/game/ui/GamePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <GamePage />,
    }
])
