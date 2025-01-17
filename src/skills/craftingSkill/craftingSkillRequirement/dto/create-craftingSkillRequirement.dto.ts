import { z } from 'zod';

export const createCraftingSkillRequirementSchema = z.object({
  skillId: z.number().int().positive(),
  unlockLevel: z.number().int().positive(),
  description: z.string().max(400).optional(),
  recipeId: z.number().int().positive().optional(),
});

export type CreateCraftingSkillRequirementDto = z.infer<
  typeof createCraftingSkillRequirementSchema
>;
