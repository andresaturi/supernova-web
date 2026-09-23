import { z } from "zod";

const allowedFileTypes = [
  "image/png",
  "image/jpeg",
  "application/pdf",
];

const allowedFileExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".pdf",
];

function hasAllowedExtension(fileName: string) {
  const normalizedFileName = fileName.toLowerCase();

  return allowedFileExtensions.some((extension) =>
    normalizedFileName.endsWith(extension)
  );
}

export const orderSchema = z
  .object({
    customer_id: z
      .string()
      .uuid("Selecione um cliente."),

    file: z
      .instanceof(File)
      .optional()
      .refine(
        (file) =>
          file === undefined ||
          allowedFileTypes.includes(file.type) ||
          hasAllowedExtension(file.name),
        "Envie uma imagem PNG, JPG, JPEG ou um arquivo PDF."
      ),

    notes: z
      .string()
      .max(
        1000,
        "As observações devem ter no máximo 1000 caracteres."
      )
      .optional(),

    paid: z.boolean(),

    payment_method: z
      .enum([
        "pix",
        "cash",
        "credit_card",
        "debit_card",
        "bank_slip",
        "bank_transfer",
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["file"],
        message: "Selecione um arquivo.",
      });
    }

    if (data.paid && !data.payment_method) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["payment_method"],
        message: "Informe a forma de pagamento.",
      });
    }
  });

export type OrderFormData = z.infer<typeof orderSchema>;

export const orderStatusSchema = z.object({
  status: z.string().min(1, "Selecione um status."),
});

export type OrderStatusFormData = z.infer<
  typeof orderStatusSchema
>;