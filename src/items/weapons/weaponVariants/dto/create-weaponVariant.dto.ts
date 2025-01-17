import { z } from 'zod';

export const createWeaponVariantSchema = z.object({
  name: z.string(),
  weaponId: z.number().int().positive(),
});

export type CreateWeaponVariantDto = z.infer<typeof createWeaponVariantSchema>;
