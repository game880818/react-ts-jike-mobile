import { createBrowserRouter } from 'react-router-dom'
import Home from '@/Pages/Home'
import Detail from '@/Pages/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
])

export default router
