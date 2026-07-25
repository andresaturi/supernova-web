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

export interface CreateCompanyDTO {
  name: string;
  legal_name: string;
  document: string;
  email: string;
  phone: string;
  whatsapp: string;
}