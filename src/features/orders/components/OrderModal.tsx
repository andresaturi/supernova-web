import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
          />
        </div>

        <DialogFooter className="px-8 py-6 border-t bg-muted/10">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            form="order-form"
          >
            {orderId
              ? "Salvar alterações"
              : "Criar Pedido"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}