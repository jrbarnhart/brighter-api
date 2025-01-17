import { z } from 'zod';

export const updateGatheringSkillRequirementSchema = z.object({
  skillId: z.number().int().positive().optional(),
  unlockLevel: z.number().int().positive().optional(),
  description: z.string().max(400).optional(),
  resourceVariantId: z.number().int().positive().optional(),
});

export type UpdateGatheringSkillRequirementDto = z.infer<
  typeof updateGatheringSkillRequirementSchema
>;
