import { api } from "@/services/api";

import type { ProductionOrder } from "../types/production";

export async function getProductionOrders() {
  const { data } = await api.get<ProductionOrder[]>("/production");

  return data;
}

export async function startProduction(id: string) {
  const { data } = await api.post<ProductionOrder>(
    `/production/${id}/start`
  );

  return data;
}

export async function finishProduction(id: string) {
  const { data } = await api.post<ProductionOrder>(
    `/production/${id}/finish`
  );

  return data;
}

export async function downloadProductionFile(id: string) {
  const response = await api.get(`/production/${id}/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(response.data);

  const link = document.createElement("a");

  const disposition = response.headers["content-disposition"];

  let filename = "download";

  if (disposition) {
    const match = disposition.match(/filename="?([^"]+)"?/);

    if (match) {
      filename = match[1];
    }
  }

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}