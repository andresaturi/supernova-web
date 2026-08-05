import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { OrderForm } from "./OrderForm";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  orderId?: string;
}

export function OrderModal({
  open,
  onOpenChange,
  orderId,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="w-[95vw] max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {orderId
              ? "Editar Pedido"
              : "Novo Pedido"}
          </DialogTitle>

          <DialogDescription>
            Selecione o cliente, envie o arquivo para impressão e adicione observações, se necessário.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <OrderForm
            orderId={orderId}
            onSuccess={() => onOpenChange(false)}
            onSubmittingChange={setIsSubmitting}
          />
        </div>

        <DialogFooter className="px-8 py-6 border-t bg-muted/10">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            form="order-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {orderId ? "Salvando..." : "Criando pedido..."}
              </>
            ) : orderId ? (
              "Salvar alterações"
            ) : (
              "Criar Pedido"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
