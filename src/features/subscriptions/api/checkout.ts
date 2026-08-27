import { api } from "@/services/api";

interface CheckoutResponse {
  url: string;
}

export async function createCheckout(
  planId: string
): Promise<CheckoutResponse> {
  const { data } = await api.post<CheckoutResponse>(
    "/subscriptions/checkout",
    null,
    {
      params: {
        plan_id: planId,
      },
    }
  );

  return data;
}