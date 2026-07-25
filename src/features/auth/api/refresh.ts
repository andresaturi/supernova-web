import { apiPublic } from "@/services/api";
import type { RefreshResponse } from "../types/auth";

export async function refresh(refreshToken: string) {
  const { data } = await apiPublic.post<RefreshResponse>(
    "/auth/refresh",
    {
      refresh: refreshToken,
    }
  );

  return data;
}