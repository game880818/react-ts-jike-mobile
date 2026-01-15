import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// routerをimportして、RouterProviderに渡す
import router from './router'


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
