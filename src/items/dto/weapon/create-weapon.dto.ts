import { zELEMENT, zFACTION } from 'src/zod/enums';
import { z } from 'zod';

export const createWeaponSchema = z.object({
  name: z.string(),
  regionId: z.number().int().positive(),
  faction: zFACTION,
  isRanged: z.boolean(),
  isTwoHanded: z.boolean(),
  element: zELEMENT,
});

export type CreateWeaponDto = z.infer<typeof createWeaponSchema>;
