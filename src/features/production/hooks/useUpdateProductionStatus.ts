import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProductionStatus } from "../api/production";
import type { ProductionStatus } from "../types/production";

export function useUpdateProductionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: ProductionStatus;
    }) => updateProductionStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["production"],
      });
    },
  });
}