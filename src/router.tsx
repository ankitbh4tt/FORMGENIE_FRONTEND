import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  // Add /ai-chat, /login, etc. later
]);

export default router;