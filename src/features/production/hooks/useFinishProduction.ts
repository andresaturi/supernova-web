import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishProduction } from "../api/production";
import { productionKeys } from "../queryKeys";

export function useFinishProduction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => finishProduction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionKeys.all,
      });
    },
  });
}