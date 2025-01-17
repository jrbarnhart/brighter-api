import { z } from 'zod';

export const updateCraftingSkillRequirementSchema = z.object({
  skillId: z.number().int().positive().optional(),
  unlockLevel: z.number().int().positive().optional(),
  description: z.string().max(400).optional(),
  recipeId: z.number().int().positive().optional(),
});

export type UpdateCraftingSkillRequirementDto = z.infer<
  typeof updateCraftingSkillRequirementSchema
>;
