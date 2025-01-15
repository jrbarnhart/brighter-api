import { zELEMENT } from 'src/zod/enums';
import { z } from 'zod';

export const updateMonsterSchema = z.object({
  name: z.string().optional(),
  skillId: z.number().int().positive().optional(),
  passive: z.boolean().optional(),
  attackElement: zELEMENT.optional(),
  immuneElement: zELEMENT.optional(),
  vulnerableElement: zELEMENT.optional(),
});

export type UpdateMonsterDto = z.infer<typeof updateMonsterSchema>;
