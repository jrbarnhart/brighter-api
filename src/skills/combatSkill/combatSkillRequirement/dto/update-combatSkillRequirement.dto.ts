import { z } from 'zod';

export const updateCombatSkillRequirementSchema = z.object({
  skillId: z.number().int().positive().optional(),
  unlockLevel: z.number().int().positive().optional(),
  description: z.string().max(400).optional(),
  monsterVariantId: z.number().int().positive().optional(),
});

export type UpdateCombatSkillRequirementDto = z.infer<
  typeof updateCombatSkillRequirementSchema
>;
