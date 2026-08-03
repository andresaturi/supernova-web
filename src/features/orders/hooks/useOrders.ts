import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../api";
import { orderKeys } from "../queryKeys";

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: getOrders,
  });
}