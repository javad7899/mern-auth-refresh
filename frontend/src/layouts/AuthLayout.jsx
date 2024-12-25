import { Navigate, Outlet } from "react-router";
import Header from "../components/Header";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

const AuthLayout = () => {
  const { isAuthenticated, refreshAccessToken, isLoading } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    if (!isAuthenticated) {
      refreshAccessToken();
    }
  }, [isAuthenticated, refreshAccessToken]);

  if (isLoading || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
