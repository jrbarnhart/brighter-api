import { z } from 'zod';

export const createCombatSkillRequirementSchema = z.object({
  skillId: z.number().int().positive(),
  unlockLevel: z.number().int().positive(),
  description: z.string().max(400).optional(),
  monsterVariantId: z.number().int().positive().optional(),
});

export type CreateCombatSkillRequirementDto = z.infer<
  typeof createCombatSkillRequirementSchema
>;
