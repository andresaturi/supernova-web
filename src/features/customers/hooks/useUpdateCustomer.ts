import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCustomer } from "../api";
import type { CustomerFormData } from "../validation";

interface UpdateCustomerData {
  id: string;
  data: CustomerFormData;
}

interface UseUpdateCustomerOptions {
  onSuccess?: () => void;
}

export function useUpdateCustomer(
  options?: UseUpdateCustomerOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCustomerData) =>
      updateCustomer(id, data),

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