import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { createPriceTable } from "../api/priceTables";
import { pricingKeys } from "../queryKeys";

export function useCreatePriceTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPriceTable,

    onSuccess: () => {
      toast.success("Tabela criada com sucesso!");

      queryClient.invalidateQueries({
        queryKey: pricingKeys.tables(),
      });
    },

    onError: (error: Error) => {
       toast.error(getErrorMessage(error));
    },
  });
}