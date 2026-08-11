import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { AppSidebar } from "./AppSidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <AppNavbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex">
        <AppSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}