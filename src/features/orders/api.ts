import { api } from "@/services/api";

import type { Order } from "./types";
import type { OrderFormData } from "./validation";

export async function getOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/orders");

  return data;
}

export async function getOrder(
  id: string
): Promise<Order> {
  const { data } = await api.get<Order>(
    `/orders/${id}`
  );

  return data;
}

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

export async function updateOrder(
  id: string,
  payload: Pick<OrderFormData, "notes">
): Promise<Order> {
  const { data } = await api.put<Order>(
    `/orders/${id}`,
    payload
  );

  return data;
}

export async function changeOrderStatus(
  id: string,
  status: string
): Promise<Order> {
  const { data } = await api.patch<Order>(
    `/orders/${id}/status`,
    {
      status,
    }
  );

  return data;
}