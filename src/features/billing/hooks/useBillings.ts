import { useQuery } from "@tanstack/react-query";

import { getBillings } from "../api";
import { billingKeys } from "../queryKeys";
import type { BillingStatus } from "../types/billing";

export function useBillings(
  status?: BillingStatus
) {
  return useQuery({
    queryKey: billingKeys.list(status),

    queryFn: () =>
      getBillings(status),
  });
}
