import { SignIn, useUser } from "@clerk/clerk-react";
import { Outlet, useLocation } from "react-router-dom";
import { CenteredSpinner } from "@/components/ui/spinner";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-dvh bg-bg">
        <CenteredSpinner label="Loading your workspace…" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-4">
        <SignIn
          fallbackRedirectUrl={location.pathname}
          appearance={{
            variables: {
              colorPrimary: "#2b4acb",
              borderRadius: "10px",
            },
            elements: {
              cardBox: "shadow-lg border border-border rounded-2xl",
            },
          }}
        />
      </div>
    );
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
