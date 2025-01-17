import { zFACTION, zGEARSLOT } from 'src/zod/enums';
import { z } from 'zod';

export const createArmorSchema = z.object({
  name: z.string(),
  faction: zFACTION,
  slot: zGEARSLOT,
});

export type CreateArmorDto = z.infer<typeof createArmorSchema>;
