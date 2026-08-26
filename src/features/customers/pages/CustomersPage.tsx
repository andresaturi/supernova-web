import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { CustomerModal } from "../components/CustomerModal";
import { CustomerTable } from "../components/CustomerTable";
import type { Customer } from "../types";
import { useAuth } from "@/providers/AuthProvider";

export default function CustomersPage() {
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer>();
  const { user } = useAuth();

  const clientPortalUrl = import.meta.env.VITE_CLIENT_PORTAL_URL;
console.log(user?.company);
  const portalUrl = user?.company?.slug
  ? `${clientPortalUrl}/${user.company.slug}`
  : null;

  console.log("portalUrl", portalUrl);
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

          <div className="flex items-center gap-2">
            {portalUrl && (
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Portal do cliente
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}

            <Button onClick={handleCreate}>
              Novo Cliente
            </Button>
          </div>
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