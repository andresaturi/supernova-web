import { Button } from "@/components/ui/button";
import { Check, Download, Loader2, Play } from "lucide-react";

import { useDownloadProduction } from "../hooks/useDownloadProduction";
import { useFinishProduction } from "../hooks/useFinishProduction";
import { useStartProduction } from "../hooks/useStartProduction";
import type { ProductionOrder } from "../types/production";

interface Props {
  order: ProductionOrder;
}

export function ProductionActions({ order }: Props) {
  const startMutation = useStartProduction();
  const finishMutation = useFinishProduction();
  const downloadMutation = useDownloadProduction();

  return (
    <div className="flex items-center justify-end gap-2">

      <Button
        variant="outline"
        size="icon"
        title="Baixar arquivo"
        disabled={downloadMutation.isPending}
        onClick={() => downloadMutation.mutate(order.id)}
      >
        {downloadMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </Button>

      {(order.status === "pending" || order.status === "ready_for_production") && (
        <Button
          size="icon"
          title="Iniciar produção"
          disabled={startMutation.isPending}
          onClick={() => startMutation.mutate(order.id)}
        >
          {startMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      )}

      {order.status === "in_production" && (
        <Button
          size="icon"
          title="Finalizar produção"
          disabled={finishMutation.isPending}
          onClick={() => finishMutation.mutate(order.id)}
        >
          {finishMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
      )}

    </div>
  );
}