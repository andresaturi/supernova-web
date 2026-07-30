import { useState } from "react";
import { Button } from "@/components/ui/button";

import { CustomerModal } from "../components/CustomerModal";
import { CustomerTable } from "../components/CustomerTable";
import type { Customer } from "../types";

export default function CustomersPage() {
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer>();

  function handleCreate() {
    setEditingCustomer(undefined);
    setOpen(true);
  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer);
    setOpen(true);
  }

  function handleClose(open: boolean) {
    setOpen(open);

    if (!open) {
      setEditingCustomer(undefined);
    }
  }

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

          <Button onClick={handleCreate}>
            Novo Cliente
          </Button>

        </div>

        <CustomerTable onEdit={handleEdit} />

      </div>

      <CustomerModal
        open={open}
        onOpenChange={handleClose}
        customer={editingCustomer}
      />
    </>
  );
}
