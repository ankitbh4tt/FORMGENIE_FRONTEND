import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import DashboardPage from "./components/Dashboard";
import FormsPage from "./components/Forms";
import FormSelector from "./components/FormSelector";
import FormResponses from "./components/FormResponses";
import FormView from "./components/FormView";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import AppShell from "./layouts/AppShell";
import MarketingLayout from "./layouts/MarketingLayout";
import PublicLayout from "./layouts/PublicLayout";

const router = createBrowserRouter([
  // Public marketing
  {
    element: <MarketingLayout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },

  // Public form respondent view (minimal chrome)
  {
    element: <PublicLayout />,
    children: [{ path: "/form/:formId", element: <FormView /> }],
  },

  // Authenticated product (sidebar app shell)
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/forms", element: <FormsPage /> },
          { path: "/responses", element: <FormSelector /> },
          { path: "/responses/:formId", element: <FormResponses /> },
          { path: "/chat", element: <FormBuilder /> },
          { path: "/builder", element: <FormBuilder /> },
          { path: "/builder/:sessionId", element: <FormBuilder /> },
        ],
      },
    ],
  },
]);

export default router;
