import { zELEMENT } from 'src/zod/enums';
import { z } from 'zod';

export const createMonsterSchema = z.object({
  name: z.string(),
  skillId: z.number().int().positive(),
  passive: z.boolean(),
  attackElement: zELEMENT,
  immuneElement: zELEMENT,
  vulnerableElement: zELEMENT,
});

export type CreateMonsterDto = z.infer<typeof createMonsterSchema>;
