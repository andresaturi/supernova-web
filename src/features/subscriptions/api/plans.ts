import { api } from "@/services/api";
import type { Plan } from "../types";

export async function getPlans(): Promise<Plan[]> {
  const { data } = await api.get<Plan[]>("/subscriptions/plans");

  return data;
}