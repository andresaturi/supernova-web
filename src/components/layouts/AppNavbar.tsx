import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

export function AppNavbar() {
  const { user, logout } = useAuth();
  const initial = user?.username?.charAt(0).toUpperCase() ?? "?";

  return (
    <header className="h-16 border-b bg-white px-6">
      <div className="flex h-full items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-600">SupernovaPrint</h1>

        <details className="relative">
          <summary className="flex cursor-pointer list-none items-center gap-3 rounded-lg px-2 py-1 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 [&::-webkit-details-marker]:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {initial}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user?.username}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <ChevronDown className="size-4 text-slate-500" aria-hidden="true" />
          </summary>

          <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
            {/* Adicione novas opções de conta aqui. */}
            <Button type="button" variant="ghost" className="w-full justify-start" onClick={logout}>
              <LogOut />
              Sair
            </Button>
          </div>
        </details>
      </div>
    </header>
  );
}
