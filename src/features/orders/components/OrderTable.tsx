import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status/StatusBadge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OrderStatusModal } from "./OrderStatusModal";
import { useOrders } from "../hooks/useOrders";
import { capitalize } from "@/lib/formatters";
import { Loading } from "@/components/ui/Loading";

export function OrderTable() {
  const { data, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string;
    status: string;
  } | null>(null);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="rounded-lg border bg-white shadow-sm p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Metros</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="w-[120px]">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length ? (
            data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{capitalize(order?.customer?.name)}</TableCell>

                <TableCell>
                  <StatusBadge
                        status={order.status}
                    />
                </TableCell>

                <TableCell>
                  {Number(order.meters).toFixed(2)} m
                </TableCell>

                <TableCell>
                  {Number(order.total).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell>
                   {new Date(order.created_at).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setSelectedOrder({
                        id: order.id,
                        status: order.status,
                      })
                    }
                  >
                    Status
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                Nenhum pedido encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedOrder && (
          <OrderStatusModal
            open={!!selectedOrder}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedOrder(null);
              }
            }}
            orderId={selectedOrder.id}
            currentStatus={selectedOrder.status}
          />
        )}
    </div>
  );
}