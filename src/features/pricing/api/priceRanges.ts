import { api } from "@/services/api";

import type {
  PriceRange,
} from "../types/pricing";

import type {
  PriceRangeForm,
} from "../schemas/pricing.schema";

export async function getPriceRanges(
  tableId: string
) {
  const { data } = await api.get<PriceRange[]>(
    `/pricing/tables/${tableId}/ranges`
  );

  return data;
}

export async function createPriceRange(
  tableId: string,
  payload: PriceRangeForm
) {
  const { data } = await api.post<PriceRange>(
    `/pricing/tables/${tableId}/ranges`,
    payload
  );

  return data;
}

export async function updatePriceRange(
  id: string,
  payload: Partial<PriceRangeForm>
) {
  const { data } = await api.put<PriceRange>(
    `/pricing/ranges/${id}`,
    payload
  );

  return data;
}

export async function deletePriceRange(
  id: string
) {
  await api.delete(
    `/pricing/ranges/${id}`
  );
}