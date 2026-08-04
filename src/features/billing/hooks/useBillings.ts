import { useQuery } from "@tanstack/react-query";

import { getBillings } from "../api";
import { billingKeys } from "../queryKeys";

export function useBillings(
  status?: string
) {
  return useQuery({
    queryKey: billingKeys.list(status),

    queryFn: () =>
      getBillings(status),
  });
}