import { z } from 'zod';

export const updateDropTableSchema = z.object({
  monsterVariantId: z.number().int().positive().optional(),
  resourceVariantIds: z.array(z.number().int().positive()).optional(),
  weaponVariantIds: z.array(z.number().int().positive()).optional(),
  armorVariantIds: z.array(z.number().int().positive()).optional(),
  consumableVariantIds: z.array(z.number().int().positive()).optional(),
  currency: z.number().int().positive().optional(),
});

export type UpdateDropTableDto = z.infer<typeof updateDropTableSchema>;
