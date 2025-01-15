import { z } from 'zod';

export const updateCraftingSkillSchema = z.object({
  name: z.string().max(256).optional(),
  regionId: z.number().int().positive().optional(),
});

export type UpdateCraftingSkillDto = z.infer<typeof updateCraftingSkillSchema>;
