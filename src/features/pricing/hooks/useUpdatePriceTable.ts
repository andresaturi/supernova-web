import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePriceTable } from "../api/priceTables";
import { pricingKeys } from "../queryKeys";
import type { PriceTableCreatePayload } from "../schemas/pricing.schema";
import { getErrorMessage } from "@/lib/errors";


interface UpdatePriceTableInput {
  id: string;
  payload: PriceTableCreatePayload;
}

export function useUpdatePriceTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePriceTableInput) =>
      updatePriceTable(id, payload),

    onSuccess: () => {
      toast.success("Tabela atualizada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: pricingKeys.tables(),
      });
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error));
    },
  });
}