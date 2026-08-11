import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Loading } from "@/components/ui/Loading";

export function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}