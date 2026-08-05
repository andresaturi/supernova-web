import { useMutation, useQueryClient } from "@tanstack/react-query";

import { startProduction } from "../api/production";
import { productionKeys } from "../queryKeys";

export function useStartProduction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => startProduction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionKeys.all,
      });
    },
  });
}