import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { OrderModal } from "../components/OrderModal";
import { OrderTable } from "../components/OrderTable";
import { useOrders } from "../hooks/useOrders";

export default function OrdersPage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data: orders = [] } = useOrders();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName =
        order.customer?.name?.toLowerCase() ?? "";

      const matchesSearch = customerName.includes(
        search.toLowerCase()
      );

      const matchesStatus =
        status === "all" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  function clearFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Pedidos
            </h1>

            <p className="text-muted-foreground">
              Gerencie seus pedidos de impressão.
            </p>
          </div>

          <Button onClick={() => setOpen(true)}>
            Novo Pedido
          </Button>
        </div>

        {/* Filtros */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
            
            {/* Busca */}
            <Input
              placeholder="Buscar por cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">
                Todos os status
              </option>

              <option value="pending">
                Pendente
              </option>

              <option value="in_production">
                Em produção
              </option>

              <option value="completed">
                Concluído
              </option>

              <option value="cancelled">
                Cancelado
              </option>
            </select>

            {/* Limpar */}
            <Button
              variant="outline"
              onClick={clearFilters}
            >
              Limpar filtros
            </Button>
          </div>
        </div>

        {/* Tabela */}
        <OrderTable orders={filteredOrders} />
      </div>

      <OrderModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}