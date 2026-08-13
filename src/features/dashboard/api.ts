import { api } from "@/services/api";
import type { Dashboard } from "./types";

export type DashboardPeriod = "7d" | "30d" | "month";

export async function getDashboard(
  period: DashboardPeriod = "30d",
): Promise<Dashboard> {
  const response = await api.get<Dashboard>("/dashboard/", {
    params: {
      period,
    },
  });

  return response.data;
}