import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Printer,
  DollarSign,
  Settings,
  X,
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    label: "Empresa",
    path: "/configuracoes/empresa",
    icon: Settings,
  },
];

export function AppSidebar({
  isOpen,
  onClose,
}: AppSidebarProps) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Fechar menu"
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 z-50
          flex h-[calc(100vh-4rem)] w-64
          flex-col border-r bg-white
          shadow-xl transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:z-auto
          md:h-[calc(100vh-4rem)]
          md:translate-x-0
          md:shadow-none
        `}
      >
        {/* Cabeçalho mobile */}
        <div className="flex items-center justify-between border-b p-4 md:hidden">
          <span className="font-semibold text-slate-800">
            Menu
          </span>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
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
    </>
  );
}