import { z } from 'zod';

export const createCombatSkillSchema = z.object({
  name: z.string().max(256),
  regionId: z.number().int().positive(),
});

export type CreateCombatSkillDto = z.infer<typeof createCombatSkillSchema>;
