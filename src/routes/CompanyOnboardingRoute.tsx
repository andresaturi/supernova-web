import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

export function CompanyOnboardingRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Quem já possui empresa não deve acessar esta página
  if (user.company) {
    return <Navigate to="/dashboard" replace />;
  } 

  return <Outlet />;
}