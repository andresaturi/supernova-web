import { useState } from "react";

import { Button } from "@/components/ui/button";

import { OrderModal } from "../components/OrderModal";
import { OrderTable } from "../components/OrderTable";

export default function OrdersPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
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

        <OrderTable />
      </div>

      <OrderModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}