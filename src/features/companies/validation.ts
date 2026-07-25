import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3, "Informe o nome da empresa"),
  legal_name: z.string().min(3, "Informe a razão social"),
  document: z.string().min(11, "Documento inválido"),
  email: z.email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
});

export type CompanyFormData = z.infer<typeof companySchema>;
