import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "../api";

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompany,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company"],
      });
    },
  });
}