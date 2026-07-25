import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export function CompanyRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.company) {
    return <Navigate to="/empresa/cadastro" replace />;
  }

  return <Outlet />;
}