import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { BillingForm } from "./BillingForm";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function BillingModal({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            Nova Fatura
          </DialogTitle>

          <DialogDescription>
            Cadastre uma cobrança manual.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6">
          <BillingForm
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
            form="billing-form"
            type="submit"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}