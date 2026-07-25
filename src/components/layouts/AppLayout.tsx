import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { AppSidebar } from "./AppSidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <AppNavbar />

      <div className="flex">
        <AppSidebar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}