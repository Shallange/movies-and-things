import { createHashRouter } from 'react-router'

import HomePage from '../pages/HomePage'
import MoviesPage from '../pages/MoviesPage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import CartPage from '../pages/CartPage'

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/movies',
    element: <MoviesPage />,
  },
  {
    path: '/movies/:id',
    element: <MovieDetailsPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
])

export default router