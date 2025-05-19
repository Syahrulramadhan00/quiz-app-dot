import ProtectedRoute from "../guards/ProtectedRoute"
import { DefaultLayout } from "../layouts/DefaultLayout"
import { MainLayout } from "../layouts/MainLayout"
import { History } from "../pages/History"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Quiz } from "../pages/Quiz"


export const appRoutes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <ProtectedRoute> <Home/> </ProtectedRoute>},
      { path: '/history', element:<ProtectedRoute> <History/> </ProtectedRoute> },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/quiz', element: <ProtectedRoute> <Quiz/> </ProtectedRoute> },
    ],
  },
]

