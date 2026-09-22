import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Utils/UserContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
