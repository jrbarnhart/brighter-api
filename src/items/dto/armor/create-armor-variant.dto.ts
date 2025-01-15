import { z } from 'zod';

export const createArmorVariantSchema = z.object({
  name: z.string(),
  armorId: z.number().int().positive(),
});

export type CreateArmorVariantDto = z.infer<typeof createArmorVariantSchema>;
