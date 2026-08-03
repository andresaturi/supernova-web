import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeOrderStatus } from "../api";
import { orderKeys } from "../queryKeys";

interface UseChangeOrderStatusOptions {
  onSuccess?: () => void;
}

export function useChangeOrderStatus(
  options?: UseChangeOrderStatusOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) =>
      changeOrderStatus(id, status),

    onSuccess: () => {
      toast.success("Status atualizado com sucesso.");

      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível atualizar o status."
      );
    },
  });
}