import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeBillingStatus } from "../api";
import { billingKeys } from "../queryKeys";

import type { BillingStatus } from "../types/billing";

interface Options {
  onSuccess?: () => void;
}

export function useChangeBillingStatus(
  options?: Options
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: BillingStatus;
    }) =>
      changeBillingStatus(
        id,
        status
      ),

    onSuccess: () => {
      toast.success(
        "Status atualizado com sucesso."
      );

      queryClient.invalidateQueries({
        queryKey: billingKeys.all,
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível alterar o status."
      );
    },
  });
}