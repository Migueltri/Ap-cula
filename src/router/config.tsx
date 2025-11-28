import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const CategoryPage = lazy(() => import('../pages/category/page'));
const CalendarPage = lazy(() => import('../pages/calendar/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const ProductDetailPage = lazy(() => import('../pages/product-detail/page'));
import FavoritesPage from '../pages/favorites/page';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tienda',
    element: <HomePage />,
  },
  {
    path: '/categoria/:slug',
    element: <CategoryPage />,
  },
  {
    path: '/calendario',
    element: <CalendarPage />,
  },
  {
    path: '/contacto',
    element: <ContactPage />,
  },
  {
    path: '/producto/:category/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/favoritos',
    element: <FavoritesPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
