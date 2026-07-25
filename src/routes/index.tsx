import { createBrowserRouter } from "react-router-dom";

import { LoginPage } from "@/features/auth/pages/LoginPage";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import RegisterCompanyPage from "@/features/companies/pages/RegisterCompanyPage";

import { AppLayout } from "@/components/layouts/AppLayout";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { CompanyRoute } from "./CompanyRoute";
import { CompanyOnboardingRoute } from "./CompanyOnboardingRoute";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },

  // Rotas apenas autenticadas
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <CompanyOnboardingRoute />,
        children: [
          {
            path: "/empresa/cadastro",
            element: <RegisterCompanyPage />,
          },
        ],
      },
    ],
  },

  // Rotas autenticadas + empresa cadastrada
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <CompanyRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "/dashboard",
                element: <DashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
