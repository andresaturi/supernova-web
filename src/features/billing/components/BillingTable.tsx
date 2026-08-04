import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Eye,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Billing } from "../types/billing";

import { BillingPaymentModal } from "./BillingPaymentModal";

interface Props {
  data: Billing[];
  loading: boolean;
}

const statusMap = {
  pending: {
    label: "Pendente",
    variant: "secondary",
  },
  paid: {
    label: "Pago",
    variant: "default",
  },
  overdue: {
    label: "Vencido",
    variant: "destructive",
  },
  cancelled: {
    label: "Cancelado",
    variant: "outline",
  },
} as const;

const paymentMethodMap = {
  pix: "PIX",
  cash: "Dinheiro",
  credit_card: "Cartão Crédito",
  debit_card: "Cartão Débito",
  bank_slip: "Boleto",
  transfer: "Transferência",
  other: "-",
};

export function BillingTable({
  data,
  loading,
}: Props) {
  const [selected, setSelected] = useState<Billing | null>(
    null
  );

  if (loading) {
    return (
      <div className="rounded-lg border p-10 text-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Pedido</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="w-[140px] text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  Nenhuma fatura encontrada.
                </TableCell>
              </TableRow>
            )}

            {data.map((billing) => (
              <TableRow key={billing.id}>
                <TableCell className="font-medium">                  
                  {billing.installments}
                </TableCell>

                <TableCell>
                  {billing.customer?.name}
                </TableCell>

                <TableCell>
                  #{billing.order?.id.slice(0, 8)}
                </TableCell>

                <TableCell>
                  {new Date(
                    billing.due_date
                  ).toLocaleDateString("pt-BR")}
                </TableCell>

                <TableCell>
                  {billing.total?.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      statusMap[billing.status].variant as any
                    }
                  >
                    {statusMap[billing.status].label}
                  </Badge>
                </TableCell>

                <TableCell>
                  {
                    paymentMethodMap[
                      billing.payment_method
                    ]
                  }
                </TableCell>

                <TableCell className="text-right space-x-2">

                  {billing.status !== "paid" && (
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        setSelected(billing)
                      }
                    >
                      <CreditCard className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="outline"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {billing.status === "paid" && (
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </Button>
                  )}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selected && (
        <BillingPaymentModal
          billing={selected}
          open={!!selected}
          onOpenChange={(open) => {
            if (!open) {
              setSelected(null);
            }
          }}
        />
      )}
    </>
  );
}