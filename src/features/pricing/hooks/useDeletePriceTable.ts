import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePriceTable } from "../api/priceTables";
import { pricingKeys } from "../queryKeys";

export function useDeletePriceTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePriceTable,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: pricingKeys.tables(),
      });
    },
  });
}