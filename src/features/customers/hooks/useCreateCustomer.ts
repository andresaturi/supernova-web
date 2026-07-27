import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCustomer } from "../api";
import type { CustomerFormData } from "../validation";

interface UseCreateCustomerOptions {
  onSuccess?: () => void;
}

export function useCreateCustomer(
  options?: UseCreateCustomerOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerFormData) =>
      createCustomer(data),

    onSuccess: () => {
      toast.success("Cliente cadastrado com sucesso!");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      options?.onSuccess?.();
    },

    onError: () => {
      toast.error(
        "Não foi possível cadastrar o cliente."
      );
    },
  });
}