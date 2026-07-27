import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CustomerForm } from "./CustomerForm";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function CustomerModal({
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-3xl">

        <DialogHeader>
          <DialogTitle>
            Novo Cliente
          </DialogTitle>
        </DialogHeader>

        <CustomerForm
          onSuccess={() => onOpenChange(false)}
        />

      </DialogContent>
    </Dialog>
  );
}