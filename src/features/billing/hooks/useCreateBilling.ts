import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createBilling } from "../api";
import { billingKeys } from "../queryKeys";

import type { BillingFormData } from "../validation";

export function useCreateBilling() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BillingFormData) =>
      createBilling(payload),

    onSuccess: () => {
      toast.success("Fatura criada com sucesso.");

      queryClient.invalidateQueries({
        queryKey: billingKeys.all,
      });
    },

    onError: () => {
      toast.error("Não foi possível criar a fatura.");
    },
  });
}