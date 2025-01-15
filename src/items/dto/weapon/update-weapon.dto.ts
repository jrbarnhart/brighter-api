import { zELEMENT, zFACTION } from 'src/zod/enums';
import { z } from 'zod';

export const updateWeaponSchema = z.object({
  name: z.string().optional(),
  regionId: z.number().int().positive().optional(),
  faction: zFACTION.optional(),
  isRanged: z.boolean().optional(),
  isTwoHanded: z.boolean().optional(),
  element: zELEMENT.optional(),
});

export type UpdateWeaponDto = z.infer<typeof updateWeaponSchema>;
