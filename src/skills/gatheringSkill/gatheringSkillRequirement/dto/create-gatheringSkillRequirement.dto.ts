import { z } from 'zod';

export const createGatheringSkillRequirementSchema = z.object({
  skillId: z.number().int().positive(),
  unlockLevel: z.number().int().positive(),
  description: z.string().max(400).optional(),
  resourceVariantId: z.number().int().positive().optional(),
});

export type CreateGatheringSkillRequirementDto = z.infer<
  typeof createGatheringSkillRequirementSchema
>;
