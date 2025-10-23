import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LandingPage } from "./pages/LandingPage";
import DashboardPage from "./components/Dashboard";
import FormView from "./components/FormView";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import FormBuilder from "./components/FormBuilder/FormBuilder";

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
      {
        path: "/builder",
        element: (
          <ProtectedRoutes>
            <FormBuilder />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/builder/:sessionId",
        element: (
          <ProtectedRoutes>
            <FormBuilder />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/form/:formId",
        element: <FormView />,
      },
    ],
  },
]);

export default router;
