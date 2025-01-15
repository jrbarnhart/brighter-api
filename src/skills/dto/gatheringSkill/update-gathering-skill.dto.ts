import { z } from 'zod';

export const updateGatheringSkillSchema = z.object({
  name: z.string().max(256).optional(),
  regionId: z.number().int().positive().optional(),
});

export type UpdateGatheringSkillDto = z.infer<
  typeof updateGatheringSkillSchema
>;
