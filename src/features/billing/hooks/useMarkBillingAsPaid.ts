import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { markBillingAsPaid } from "../api";
import { billingKeys } from "../queryKeys";

import type { BillingPaymentFormData } from "../validation";

interface Options {
  onSuccess?: () => void;
}

export function useMarkBillingAsPaid(
  options?: Options
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: BillingPaymentFormData;
    }) =>
      markBillingAsPaid(
        id,
        payload
      ),

    onSuccess: () => {
      toast.success(
        "Recebimento registrado."
      );

      queryClient.invalidateQueries({
        queryKey: billingKeys.all,
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível registrar o pagamento."
      );
    },
  });
}