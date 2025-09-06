import { SignIn, useUser } from "@clerk/clerk-react";
import { Outlet, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20">
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50">
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <SignIn
            redirectUrl={location.pathname} // 👈 jis route se aya tha usi pe bhejna
            appearance={{
              elements: {
                card: "shadow-none bg-transparent",
              },
            }}
          />
        </div>
      </div>
    );
  }

  // Agar children diye ho to render karo warna Outlet
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
