import { Navbar } from "@/components/Navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="mb-6 text-5xl font-bold text-slate-900">
          Gerencie sua empresa de impressão DTF
        </h1>

        <p className="max-w-2xl text-lg text-slate-600">
          Cadastre clientes, realize orçamentos, acompanhe pedidos e organize toda
          a produção em um único sistema.
        </p>
      </main>
    </div>
  );
}