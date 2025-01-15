import { z } from 'zod';

export const updateCombatSkillSchema = z.object({
  name: z.string().max(256).optional(),
  regionId: z.number().int().positive().optional(),
});

export type UpdateCombatSkillDto = z.infer<typeof updateCombatSkillSchema>;
