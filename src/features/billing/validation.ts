import { z } from "zod";

export const billingSchema = z.object({
  customer_id: z.string().uuid(),

  total: z.coerce
    .number()
    .positive("Informe o valor da cobrança."),

  payment_method: z.enum([
    "pix",
    "cash",
    "credit_card",
    "debit_card",
    "bank_slip",
    "transfer",
    "other",
  ]),

  installments: z.coerce
    .number()
    .int()
    .min(1)
    .max(36),

  first_due_date: z
    .string()
    .min(1, "Informe o vencimento."),

  notes: z.string().optional(),
});

export type BillingFormData = z.infer<
  typeof billingSchema
>;

export const billingPaymentSchema = z.object({
  paid_amount: z.coerce
    .number()
    .positive("Informe o valor recebido."),

  payment_method: z.enum([
    "pix",
    "cash",
    "credit_card",
    "debit_card",
    "bank_slip",
    "transfer",
    "other",
  ]),

  paid_at: z.string().min(
    1,
    "Informe a data do pagamento."
  ),
});

export type BillingPaymentFormData = z.infer<
  typeof billingPaymentSchema
>;