import { zFACTION, zGEARSLOT } from 'src/zod/enums';
import { z } from 'zod';

export const updateArmorSchema = z.object({
  name: z.string().optional(),
  faction: zFACTION.optional(),
  slot: zGEARSLOT.optional(),
});

export type UpdateArmorDto = z.infer<typeof updateArmorSchema>;
