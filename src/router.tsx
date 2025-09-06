import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LandingPage } from "./pages/LandingPage";
import DashboardPage from "./components/Dashboard";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import {FormBuilder} from "./pages/FormBuilder";

const router = createBrowserRouter([
  {
    element: <App />, // <-- common layout wrapper
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoutes>
            <FormBuilder />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;
