import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { Billing } from "../types/billing";

import { BillingPaymentForm } from "./BillingPaymentForm";

interface Props {
  billing: Billing;
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function BillingPaymentModal({
  billing,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Receber Fatura</DialogTitle>

          <DialogDescription>
            Informe os dados do recebimento.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6">
          <BillingPaymentForm
            billing={billing}
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
            form="billing-payment-form"
            type="submit"
          >
            Confirmar Recebimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}