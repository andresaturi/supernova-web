import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { OrderStatusForm } from "./OrderStatusForm";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  orderId: string;
  currentStatus: string;
}

export function OrderStatusModal({
  open,
  onOpenChange,
  orderId,
  currentStatus,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            Alterar Status
          </DialogTitle>

          <DialogDescription>
            Selecione o novo status deste pedido.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6">
          <OrderStatusForm
            orderId={orderId}
            currentStatus={currentStatus}
            onSuccess={() => onOpenChange(false)}
          />
        </div>

        <DialogFooter className="px-6 py-6 border-t bg-muted/10">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button
            form="order-status-form"
            type="submit"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}