import { createBrowserRouter } from "react-router-dom";
import CustomersPage from "@/features/customers/pages/CustomersPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import RegisterCompanyPage from "@/features/companies/pages/RegisterCompanyPage";
import CompanyPage from "@/features/companies/pages/CompanyPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import { AppLayout } from "@/components/layouts/AppLayout";
import { PriceTablesPage } from "@/features/pricing/pages/PriceTablesPage";
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
              {
                path: "/configuracoes/empresa",
                element: <CompanyPage />,
              },
              {
                path: "/clientes",
                element: <CustomersPage />,
              },
              {
                path: "/precos",
                element: <PriceTablesPage />,
              },
              {
                path: "/pedidos",
                element: <OrdersPage />,
              }
            ],
          },
        ],
      },
    ],
  },
]);


