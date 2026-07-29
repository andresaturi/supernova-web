import { useQuery } from "@tanstack/react-query";

import { getPriceTables } from "../api/priceTables";
import { pricingKeys } from "../queryKeys";

export function usePriceTables() {
  return useQuery({
    queryKey: pricingKeys.tables(),
    queryFn: getPriceTables,
  });
}