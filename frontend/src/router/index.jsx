import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
