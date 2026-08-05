import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { createPriceTable } from "../api/priceTables";
import { pricingKeys } from "../queryKeys";

interface UseCreatePriceTableOptions {
  onSuccess?: () => void;
}

export function useCreatePriceTable(
  options?: UseCreatePriceTableOptions
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPriceTable,

    onSuccess: () => {
      toast.success("Tabela criada com sucesso!");

      queryClient.invalidateQueries({
        queryKey: pricingKeys.tables(),
      });

      options?.onSuccess?.();
    },

    onError: (error: Error) => {
      toast.error(getErrorMessage(error));
    },
  });
}