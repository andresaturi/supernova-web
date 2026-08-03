import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateOrder } from "../api";
import { orderKeys } from "../queryKeys";

interface UseUpdateOrderOptions {
  onSuccess?: () => void;
}

export function useUpdateOrder(
  options?: UseUpdateOrderOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        notes?: string;
      };
    }) => updateOrder(id, payload),

    onSuccess: () => {
      toast.success("Pedido atualizado com sucesso!");

      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível atualizar o pedido."
      );
    },
  });
}