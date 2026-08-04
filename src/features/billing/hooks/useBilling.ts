import { useQuery } from "@tanstack/react-query";

import { getBilling } from "../api";
import { billingKeys } from "../queryKeys";

export function useBilling(
  id?: string
) {
  return useQuery({
    queryKey: billingKeys.detail(id!),

    queryFn: () =>
      getBilling(id!),

    enabled: !!id,
  });
}