import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOrder } from "../api";
import { orderKeys } from "../queryKeys";
import type { OrderFormData } from "../validation";

interface UseCreateOrderOptions {
  onSuccess?: () => void;
}

export function useCreateOrder(
  options?: UseCreateOrderOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderFormData) =>
      createOrder(data),

    onSuccess: () => {
      toast.success("Pedido criado com sucesso!");

      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível criar o pedido."
      );
    },
  });
}