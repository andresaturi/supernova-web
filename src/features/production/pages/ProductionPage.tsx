import { ProductionTable } from "../components/ProductionTable";
import { useProduction } from "../hooks/useProduction";

export function ProductionPage() {
  const {
    data,
    isLoading,
    isError,
  } = useProduction();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar pedidos.</div>;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Produção
        </h1>

        <p className="text-muted-foreground">
          Gerencie os pedidos em produção.
        </p>
      </div>

      <ProductionTable
        orders={data ?? []}
      />

    </div>
  );
}