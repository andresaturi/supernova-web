import { z } from "zod";

export const priceTableSchema = z.object({
  name: z
    .string()
    .min(1, "Informe o nome da tabela.")
    .max(100),

  description: z.string().optional(),

  roll_width: z
    .number()
    .positive("Informe a largura do rolo."),

  safety_margin: z
    .number()
    .min(0)
    .max(100),

  is_default: z.boolean(),

  is_active: z.boolean(),
});

export type PriceTableForm = z.infer<typeof priceTableSchema>;

export const priceRangeSchema = z.object({
  start_meter: z.coerce.number().min(0),

  end_meter: z.coerce.number().nullable(),

  price_per_meter: z.coerce.number().positive(),

  minimum_price: z.coerce.number().min(0),  

  notes: z.string().optional(),

  position: z.coerce.number(),
});

export type PriceRangeForm = z.infer<typeof priceRangeSchema>;

export interface PriceTableCreatePayload extends PriceTableForm {
  ranges: PriceRangeForm[];
}
