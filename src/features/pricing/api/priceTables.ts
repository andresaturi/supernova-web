import { api } from "@/services/api";

import type {
  PriceTable,
  PriceTableDetail,
} from "../types/pricing"

import type {
  PriceTableForm,
  PriceTableCreatePayload,
} from "../schemas/pricing.schema";

export async function createPriceTable(
  payload: PriceTableCreatePayload
) {
  const { data } = await api.post<PriceTable>(
    "/pricing/tables",
    payload
  );

  return data;
}

export async function getPriceTables(): Promise<PriceTable[]> {
  const { data } = await api.get("/pricing/tables");
  return data;
}

export async function getPriceTable(id: string): Promise<PriceTableDetail> {
  const { data } = await api.get(`/pricing/tables/${id}`);
  return data;
}

export async function updatePriceTable(
  id: string,
  payload: PriceTableCreatePayload
) {
  const { data } = await api.put<PriceTable>(
    `/pricing/tables/${id}`,
    payload
  );

  return data;
}

export async function deletePriceTable(
  id: string
) {
  await api.delete(
    `/pricing/tables/${id}`
  );
}
