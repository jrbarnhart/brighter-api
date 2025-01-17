import { z } from 'zod';

export const updateArmorVariantSchema = z.object({
  name: z.string(),
  armorId: z.number().int().positive().optional(),
});

export type UpdateArmorVariantDto = z.infer<typeof updateArmorVariantSchema>;
