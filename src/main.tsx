import { createRoot } from 'react-dom/client'
import "./app/styles/styles.scss"
import { RouterProvider } from 'react-router'
import { router } from './app/router/router'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
