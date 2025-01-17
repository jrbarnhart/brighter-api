import { z } from 'zod';

export const createConsumableVariantSchema = z.object({
  name: z.string(),
  consumableId: z.number().int().positive(),
});

export type CreateConsumableVariantDto = z.infer<
  typeof createConsumableVariantSchema
>;
