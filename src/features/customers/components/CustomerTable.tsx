import {
  Pencil,
  Phone,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer } from "../types";

interface CustomerTableProps {
  onEdit: (customer: Customer) => void;
}

export function CustomerTable({
    onEdit,
}: CustomerTableProps) {
  const { data, isLoading } = useCustomers();

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-muted-foreground">
        Carregando clientes...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-muted-foreground">
        Nenhum cliente cadastrado.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-slate-50">
          <tr className="text-sm">
            <th className="px-5 py-4 text-left font-semibold">
              Cliente
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Documento
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Tabela de preço
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Contato
            </th>

            <th className="px-5 py-4 text-center font-semibold">
              Status
            </th>

            <th className="w-28 px-5 py-4 text-center font-semibold">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((customer) => (
            <tr
              key={customer.id}
              className="border-b transition-colors hover:bg-slate-50"
            >
              <td className="px-5 py-4">
                <div className="font-medium">
                  {customer.name}
                </div>

                {customer.trade_name && (
                  <div className="text-xs text-muted-foreground">
                    {customer.trade_name}
                  </div>
                )}
              </td>

              <td className="px-5 py-4 text-sm">
                {customer.document}
              </td>

              <td className="px-5 py-4">
                <Badge variant="secondary">
                  {customer.price_table.name}
                </Badge>
              </td>

              <td className="px-5 py-4">
                <div className="space-y-1 text-sm">

                  {customer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  )}

                  {customer.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      {customer.email}
                    </div>
                  )}

                </div>
              </td>

              <td className="px-5 py-4 text-center">
                <Badge
                  variant={
                    customer.is_active
                      ? "default"
                      : "secondary"
                  }
                >
                  {customer.is_active
                    ? "Ativo"
                    : "Inativo"}
                </Badge>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center">
                 <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(customer)}
                      aria-label={`Editar ${customer.name}`}
                  >
                      <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
