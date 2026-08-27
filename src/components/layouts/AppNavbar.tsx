import { ChevronDown, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

interface AppNavbarProps {
  onMenuClick: () => void;
}

export function AppNavbar({ onMenuClick }: AppNavbarProps) {
  const { user, logout } = useAuth();

  const initial =
    user?.username?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-white px-4 sm:px-6">
      <div className="flex h-full items-center justify-between">
        {/* Esquerda */}
        <div className="flex items-center gap-3">
          {/* Botão do menu - somente mobile */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              rounded-lg p-2
              text-slate-600
              hover:bg-slate-100
              hover:text-slate-900
              md:hidden
            "
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <h1 className="text-xl font-bold text-indigo-600 sm:text-2xl">
            SupernovaPrint
          </h1>
        </div>

        {/* Usuário */}
        <details className="relative">
          <summary
            className="
              flex cursor-pointer list-none items-center gap-2
              rounded-lg px-1.5 py-1
              outline-none
              hover:bg-slate-100
              focus-visible:ring-2
              focus-visible:ring-indigo-500
              [&::-webkit-details-marker]:hidden
              sm:gap-3 sm:px-2
            "
          >
            {/* Informações */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">
                {user?.username}
              </p>

              <p className="max-w-[180px] truncate text-xs text-slate-500">
                {user?.email}
              </p>
            </div>

            {/* Avatar */}
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                bg-indigo-600
                text-sm font-semibold
                text-white
                sm:h-10 sm:w-10
              "
            >
              {initial}
            </div>

            <ChevronDown
              className="size-4 text-slate-500"
              aria-hidden="true"
            />
          </summary>

          {/* Dropdown */}
          <div
            className="
              absolute right-0 z-50 mt-2
              w-52
              rounded-lg
              border border-slate-200
              bg-white
              p-1
              shadow-lg
            "
          >
            <div className="border-b px-3 py-2 sm:hidden">
              <p className="truncate text-sm font-medium text-slate-900">
                {user?.username}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email}
              </p>
            </div>
            <a
              type="button"              
              className="w-full justify-start p-3"              
              href="/plans"
            >              
              Planos
            </a>
            <Button
              type="button"
              variant="ghost"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut />
              Sair
            </Button>            
          </div>
        </details>
      </div>
    </header>
  );
}