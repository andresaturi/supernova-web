import { useQuery } from "@tanstack/react-query";

import { getOrder } from "../api";
import { orderKeys } from "../queryKeys";

export function useOrder(id?: string) {
  return useQuery({
    queryKey: orderKeys.detail(id ?? ""),
    queryFn: () => getOrder(id!),
    enabled: !!id,
  });
}