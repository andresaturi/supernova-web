import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../api";

export function useCompany(enabled = true) {
  return useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
    enabled,
  });
}