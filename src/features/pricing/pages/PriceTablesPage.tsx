import { useState } from "react";

import { Button } from "@/components/ui/button";

import { PriceTableModal } from "../components/PriceTableModal";
import { PriceTableCard } from "../components/PriceTableCard";
import { usePriceTables } from "../hooks/usePriceTables";

export function PriceTablesPage() {
  const [open, setOpen] = useState(false);
  const [tableId, setTableId] = useState<string>();

  const { data: tables = [], isLoading } = usePriceTables();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tabelas de Preço</h1>
          <p className="text-muted-foreground">
            Gerencie as tabelas de preço da empresa.
          </p>
        </div>

        <Button
          onClick={() => {
            setTableId(undefined);
            setOpen(true);
          }}
        >
          Nova tabela
        </Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tables.map((table) => (
            <PriceTableCard
              key={table.id}
              table={table}
              onEdit={() => {
                setTableId(table.id);
                setOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <PriceTableModal
        open={open}
        onOpenChange={setOpen}
        tableId={tableId}
      />
    </div>
  );
}