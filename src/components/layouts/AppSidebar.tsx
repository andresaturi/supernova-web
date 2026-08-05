import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Printer,
  DollarSign,
  Settings,

} from "lucide-react";

const menus = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clientes",
    path: "/clientes",
    icon: Users,
  },
  /* {
    label: "Orçamentos",
    path: "/orcamentos",
    icon: FileText,
  }, */
  {
    label: "Pedidos",
    path: "/pedidos",
    icon: ClipboardList,
  },
  {
    label: "Tabela de Preço",
    path: "/precos",
    icon: DollarSign,
  },
  {
    label: "Produção",
    path: "/producao",
    icon: Printer,
  },
  {
    label: "Financeiro",
    path: "/financeiro",
    icon: DollarSign,
  },
  {
    label: "Configurações",
    path: "/configuracoes",
    icon: Settings,
  },
  {
    label: "Empresa",
    path: "/configuracoes/empresa",
    icon: Settings,
  },
  {
    label: "Usuários",
    path: "/configuracoes/usuarios",
    icon: Users,
  },
  
];

export function AppSidebar() {
  return (
    <aside className="flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white">
      <nav className="flex-1 space-y-1 p-4">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
