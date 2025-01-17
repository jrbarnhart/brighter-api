import { z } from 'zod';

export const createQuestStepSchema = z.object({
  index: z.number().int().positive(),
  description: z.string().max(400),
  questId: z.number().int().positive(),
  roomId: z.number().int().positive().optional(),
  npcId: z.number().int().positive().optional(),
});

export type CreateQuestStepDto = z.infer<typeof createQuestStepSchema>;
