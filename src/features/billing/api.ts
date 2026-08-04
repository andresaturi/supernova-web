import { api } from "@/services/api";

import type {
  Billing,
  BillingStatus,
} from "./types/billing";

import type {
  BillingFormData,
  BillingPaymentFormData,
} from "./validation";

/* ===========================
 * Listagem
 * =========================== */

export async function getBillings(
  status?: BillingStatus
): Promise<Billing[]> {
  const { data } = await api.get<Billing[]>(
    "/billings",
    {
      params: {
        status,
      },
    }
  );

  return data;
}

/* ===========================
 * Detalhe
 * =========================== */

export async function getBilling(
  id: string
): Promise<Billing> {
  const { data } = await api.get<Billing>(
    `/billings/${id}`
  );

  return data;
}

/* ===========================
 * Criação Manual
 * =========================== */

export async function createBilling(
  payload: BillingFormData
): Promise<Billing[]> {
  const { data } = await api.post<Billing[]>(
    "/billings/",
    payload
  );

  return data;
}

/* ===========================
 * Alterar Status
 * =========================== */

export async function changeBillingStatus(
  id: string,
  status: BillingStatus
): Promise<Billing> {
  const { data } = await api.patch<Billing>(
    `/billings/${id}/status`,
    {
      status,
    }
  );

  return data;
}

/* ===========================
 * Baixa Financeira
 * =========================== */

export async function markBillingAsPaid(
  id: string,
  payload: BillingPaymentFormData
): Promise<Billing> {
  const { data } = await api.patch<Billing>(
    `/billings/${id}/payment`,
    payload
  );

  return data;
}