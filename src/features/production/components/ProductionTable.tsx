import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/status/StatusBadge";
import type { ProductionOrder } from "../types/production";
import { ProductionActions } from "./ProductionActions";

interface ProductionTableProps {
  orders: ProductionOrder[];
}

export function ProductionTable({
  orders,
}: ProductionTableProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Arquivo</TableHead>
            <TableHead>Metros</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                {order.customer.name}
              </TableCell>
              <TableCell>
                 {new Date(order.created_at).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
              </TableCell>
              <TableCell>
                {order.original_filename}
              </TableCell>

              <TableCell>
                {order.meters} m
              </TableCell>

              <TableCell>
                <StatusBadge
                      status={order.status}
                  />
              </TableCell>

              <TableCell className="text-right">
                <ProductionActions order={order} />
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}