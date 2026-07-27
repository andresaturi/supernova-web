import { api } from "@/services/api";
import type {
  Company,
  CreateCompanyDTO,
  UpdateCompanyDTO,
} from "./types";

export async function createCompany(data: CreateCompanyDTO) {
  const { data: company } = await api.post<Company>(
    "/companies/",
    data
  );

  return company;
}

export async function getCompany() {
  const { data } = await api.get<Company>(
    "/companies/me"
  );

  return data;
}

export async function updateCompany(
  data: UpdateCompanyDTO
) {
  const { data: company } = await api.put<Company>(
    "/companies/me",
    data
  );

  return company;
}