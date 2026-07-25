import { api } from "@/services/api";
import type { Company, CreateCompanyDTO } from "./types";

export async function createCompany(data: CreateCompanyDTO) {
  const { data: company } = await api.post<Company>(
    "/companies/",
    data
  );

  return company;
}