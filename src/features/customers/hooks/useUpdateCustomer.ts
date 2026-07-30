import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCustomer } from "../api";
import type { CustomerFormData } from "../validation";

interface UseUpdateCustomerOptions {
  onSuccess?: () => void;
}

interface UpdateCustomerPayload {
  id: string;
  payload: CustomerFormData;
}

export function useUpdateCustomer(
  options?: UseUpdateCustomerOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateCustomerPayload) =>
      updateCustomer(id, payload),

    onSuccess: () => {
      toast.success("Cliente atualizado com sucesso!");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível atualizar o cliente."
      );
    },
  });
}