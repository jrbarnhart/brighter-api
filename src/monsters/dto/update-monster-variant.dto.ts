import { z } from 'zod';

export const updateMonsterVariantSchema = z.object({
  name: z.string().optional(),
  monsterId: z.number().int().positive().optional(),
});

export type UpdateMonsterVariantDto = z.infer<
  typeof updateMonsterVariantSchema
>;
