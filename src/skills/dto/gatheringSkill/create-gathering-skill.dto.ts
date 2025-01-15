import { z } from 'zod';

export const createGatheringSkillSchema = z.object({
  name: z.string().max(256),
  regionId: z.number().int().positive(),
});

export type CreateGatheringSkillDto = z.infer<
  typeof createGatheringSkillSchema
>;
