import { api } from "@/services/api";
import type { Customer } from "./types";
import type { CustomerFormData } from "./validation";

export async function getCustomers(): Promise<Customer[]> {
  const { data } = await api.get<Customer[]>("/customers");
  return data;
}

export async function createCustomer(
  payload: CustomerFormData
): Promise<Customer> {
  const { data } = await api.post<Customer>(
    "/customers/",
    payload
  );

  return data;
}

export async function updateCustomer(
  id: string,
  payload: CustomerFormData
): Promise<Customer> {
  const { data } = await api.put<Customer>(
    `/customers/${id}`,
    payload
  );

  return data;
}

export async function changeCustomerStatus(
  id: string,
  isActive: boolean
): Promise<Customer> {
  const { data } = await api.patch<Customer>(
    `/customers/${id}/status`,
    null,
    {
      params: {
        is_active: isActive,
      },
    }
  );

  return data;
}