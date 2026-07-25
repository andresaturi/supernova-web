import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}