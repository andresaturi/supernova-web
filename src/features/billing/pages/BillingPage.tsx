import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BillingTable } from "../components/BillingTable";
import { BillingModal } from "../components/BillingModal";
import { useBillings } from "../hooks/useBillings";

import type { BillingStatus } from "../types/billing";

const filters: {
  label: string;
  value?: BillingStatus;
}[] = [
  {
    label: "Todos",
  },
  {
    label: "Em aberto",
    value: "pending",
  },
  {
    label: "Pagos",
    value: "paid",
  },
  {
    label: "Vencidos",
    value: "overdue",
  },
  {
    label: "Cancelados",
    value: "cancelled",
  },
];

export function BillingPage() {
  const [status, setStatus] =
  useState<BillingStatus | undefined>("pending");

  // Padrão: últimos 90 dias
  const [period, setPeriod] = useState("90");

  const [customerSearch, setCustomerSearch] = useState("");

  const [open, setOpen] = useState(false);

  const { data = [], isLoading } = useBillings(status);

  const filteredData = useMemo(() => {
    const now = new Date();

    const days = Number(period);

    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);

    return data.filter((billing) => {
      // -------------------------
      // Filtro por cliente
      // -------------------------
      const customerName =
        billing.customer?.name?.toLowerCase() ?? "";

      const matchesCustomer =
        customerName.includes(
          customerSearch.toLowerCase()
        );

      if (!matchesCustomer) {
        return false;
      }

      // -------------------------
      // Filtro por período
      // -------------------------
      if (period !== "all") {
        const billingDate = new Date(
          billing.created_at
        );

        if (
          billingDate < startDate ||
          billingDate > now
        ) {
          return false;
        }
      }

      return true;
    });
  }, [data, customerSearch, period]);

  function clearFilters() {
    setStatus("pending");
    setPeriod("90");
    setCustomerSearch("");
  }

  return (
    <>
      <div className="space-y-6">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Financeiro
            </h1>

            <p className="text-muted-foreground">
              Gerencie suas faturas e pagamentos.
            </p>
          </div>

          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Fatura
          </Button>
        </div>

        {/* Filtros */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="space-y-4">

            {/* Status */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.label}
                  variant={
                    status === filter.value
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                      setStatus(filter.value)
                    
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Cliente + período */}
            <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">

              {/* Cliente */}
              <Input
                placeholder="Buscar por cliente..."
                value={customerSearch}
                onChange={(e) =>
                  setCustomerSearch(e.target.value)
                }
              />

              {/* Período */}
              <select
                value={period}
                onChange={(e) =>
                  setPeriod(e.target.value)
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="30">
                  Últimos 30 dias
                </option>

                <option value="90">
                  Últimos 90 dias
                </option>

                <option value="180">
                  Últimos 180 dias
                </option>

                <option value="365">
                  Último ano
                </option>

                <option value="all">
                  Todo o período
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

            {/* Contador */}
            <div className="text-sm text-muted-foreground">
              {filteredData.length}{" "}
              {filteredData.length === 1
                ? "fatura encontrada"
                : "faturas encontradas"}
            </div>
          </div>
        </div>

        {/* Tabela */}
        <BillingTable
          data={filteredData}
          loading={isLoading}
        />

      </div>

      <BillingModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}