import { Badge } from "@/components/ui/badge";

import type { ProductionStatus } from "../types/production";

interface Props {
  status: ProductionStatus;
}

export function ProductionStatusBadge({ status }: Props) {
  switch (status) {
    case "ready_for_production":
      return (
        <Badge variant="secondary">
          Pronto
        </Badge>
      );

    case "in_production":
      return (
        <Badge>
          Em produção
        </Badge>
      );

    case "finished":
      return (
        <Badge variant="default">
          Finalizado
        </Badge>
      );

    case "delivered":
      return (
        <Badge variant="outline">
          Entregue
        </Badge>
      );

    case "canceled":
      return (
        <Badge variant="destructive">
          Cancelado
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}