import { z } from 'zod';

export const createDropTableSchema = z.object({
  monsterVariantId: z.number().int().positive(),
  resourceVariantIds: z.array(z.number().int().positive()).optional(),
  weaponVariantIds: z.array(z.number().int().positive()).optional(),
  armorVariantIds: z.array(z.number().int().positive()).optional(),
  consumableVariantIds: z.array(z.number().int().positive()).optional(),
  currency: z.number().int().positive().optional(),
});

export type CreateDropTableDto = z.infer<typeof createDropTableSchema>;
