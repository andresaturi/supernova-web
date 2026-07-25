import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          SupernovaPrint
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}