import { z } from 'zod';

export const updateWeaponVariantSchema = z.object({
  name: z.string().optional(),
  weaponId: z.number().int().positive().optional(),
});

export type UpdateWeaponVariantDto = z.infer<typeof updateWeaponVariantSchema>;
