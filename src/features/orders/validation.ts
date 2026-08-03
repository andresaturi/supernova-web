import { z } from "zod";

const allowedFileTypes = ["image/png", "image/jpeg", "application/pdf"];
const allowedFileExtensions = [".png", ".jpg", ".jpeg", ".pdf"];

function hasAllowedExtension(fileName: string) {
  const normalizedFileName = fileName.toLowerCase();

  return allowedFileExtensions.some((extension) =>
    normalizedFileName.endsWith(extension)
  );
}

export const orderSchema = z.object({
  customer_id: z
    .string()
    .uuid("Selecione um cliente."),

  file: z
    .instanceof(File, {
      message: "Selecione um arquivo.",
    })
    .refine(
      (file) =>
        allowedFileTypes.includes(file.type) || hasAllowedExtension(file.name),
      "Envie uma imagem PNG, JPG, JPEG ou um arquivo PDF."
    ),

  notes: z
    .string()
    .max(
      1000,
      "As observações devem ter no máximo 1000 caracteres."
    )
    .optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;


export const orderStatusSchema = z.object({
  status: z.string().min(1, "Selecione um status."),
});

export type OrderStatusFormData = z.infer<
  typeof orderStatusSchema
>;
