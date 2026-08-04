import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  const [status, setStatus] = useState<BillingStatus>();
  const [open, setOpen] = useState(false);

  const { data = [], isLoading } = useBillings(status);

  return (
    <>
      
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Nova Fatura
      </Button>
       
      <div className="space-y-6">

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

        <BillingTable
          data={data}
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