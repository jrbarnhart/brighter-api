import { z } from 'zod';

export const updateConsumableVariantSchema = z.object({
  name: z.string().optional(),
  consumableId: z.number().int().positive().optional(),
});

export type UpdateConsumableVariantDto = z.infer<
  typeof updateConsumableVariantSchema
>;
