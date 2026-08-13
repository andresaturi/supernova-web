import { useQuery } from "@tanstack/react-query";

import {
  getDashboard,
  type DashboardPeriod,
} from "../services/dashboard";

export function useDashboard(
  period: DashboardPeriod = "30d",
) {
  return useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => getDashboard(period),
  });
}