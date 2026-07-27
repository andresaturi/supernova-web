export interface Company {
  id: string;
  name: string;
  legal_name: string;
  document: string;
  email: string;
  phone: string;
  whatsapp: string;
  slug: string;
  is_active: boolean;
}

export type CreateCompanyDTO = Omit<
  Company,
  "id" | "slug" | "is_active"
>;

export type UpdateCompanyDTO = CreateCompanyDTO;