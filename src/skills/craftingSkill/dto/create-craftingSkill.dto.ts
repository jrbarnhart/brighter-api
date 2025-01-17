import { z } from 'zod';

export const createCraftingSkillSchema = z.object({
  name: z.string().max(256),
  regionId: z.number().int().positive(),
});

export type CreateCraftingSkillDto = z.infer<typeof createCraftingSkillSchema>;
