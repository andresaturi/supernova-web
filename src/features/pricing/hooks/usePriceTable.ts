import { useQuery } from "@tanstack/react-query";

import { getPriceTable } from "../api/priceTables";
import { pricingKeys } from "../queryKeys";

export function usePriceTable(id?: string) {
  return useQuery({
    queryKey: pricingKeys.table(id ?? ""),
    queryFn: () => getPriceTable(id!),
    enabled: !!id,
  });
}