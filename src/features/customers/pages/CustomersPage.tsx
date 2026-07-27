import { useState } from "react";
import { Button } from "@/components/ui/button";

import { CustomerTable } from "../components/CustomerTable";
import { CustomerModal } from "../components/CustomerModal";

export default function CustomersPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              Clientes
            </h1>

            <p className="text-muted-foreground">
              Gerencie seus clientes.
            </p>
          </div>

          <Button onClick={() => setOpen(true)}>
              Novo Cliente
          </Button>

        </div>

        <CustomerTable />

      </div>

      <CustomerModal
          open={open}
          onOpenChange={setOpen}
      />
    </>
  );
}