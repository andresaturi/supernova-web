import { api } from "@/services/api";
import type { Plan, Subscription } from "../types";

export async function getPlans(): Promise<Plan[]> {
  const { data } = await api.get<Plan[]>(
    "/subscriptions/plans"
  );

  return data;
}

export async function getMySubscription(): Promise<Subscription> {
  const { data } = await api.get<Subscription>(
    "/subscriptions/me"
  );

  return data;
}

export async function createCheckout(): Promise<{ url: string }> {
  const { data } = await api.post<{ url: string }>(
    "/subscriptions/checkout"
  );

  return data;
}