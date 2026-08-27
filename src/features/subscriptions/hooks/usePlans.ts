import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../api/plans";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });
}