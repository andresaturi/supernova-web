import { api } from "@/services/api";
import type { User } from "../types/auth";

export async function me() {
  const { data } = await api.get<User>(
    "/auth/me"
  );

  return data;
}