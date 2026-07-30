import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .transform((value) => (value === "" ? undefined : value))
  .optional();

export const customerSchema = z.object({
  person_type: z.enum(["PF", "PJ"]),

  name: z.string().trim().min(3, "Informe o nome do cliente."),

  trade_name: optionalString,

  document: z
    .string()
    .trim()
    .min(11, "Informe um CPF ou CNPJ válido."),

  state_registration: optionalString,

  municipal_registration: optionalString,

  email: z
    .string()
    .trim()
    .email("E-mail inválido."),

  phone: optionalString,

  whatsapp: optionalString,

  preferred_contact: z.enum([
    "whatsapp",
    "phone",
    "email",
  ]),

  default_payment_method: z.enum([
    "pix",
    "cash",
    "credit_card",
    "debit_card",
    "bank_slip",
    "bank_transfer",
  ]),

  price_table_id: z
  .string()
  .min(1, "Selecione uma tabela de preço."),

  origin: z.enum([
    "manual",
    "whatsapp",
    "instagram",
    "facebook",
    "site",
    "indication",
    "import",
    "api",
    "other",
  ]),

  contact_name: optionalString,

  notes: optionalString,

  is_active: z.boolean(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
