import { z } from 'zod';

export const createMonsterVariantSchema = z.object({
  name: z.string(),
  monsterId: z.number().int().positive(),
});

export type CreateMonsterVariantDto = z.infer<
  typeof createMonsterVariantSchema
>;
