import { api } from "@/services/api";

import type { Order } from "./types";
import type { OrderFormData } from "./validation";

export async function createOrder(
  payload: OrderFormData
): Promise<Order> {
  const formData = new FormData();

  formData.append(
    "customer_id",
    payload.customer_id
  );

  formData.append(
    "notes",
    payload.notes ?? ""
  );

  formData.append(
    "file",
    payload.file
  );

  const { data } = await api.post<Order>(
    "/orders/",
    formData
  );

  return data;
}