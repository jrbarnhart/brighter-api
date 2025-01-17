import { z } from 'zod';

export const updateQuestStepSchema = z.object({
  index: z.number().int().positive().optional(),
  description: z.string().max(400).optional(),
  questId: z.number().int().positive().optional(),
  roomId: z.number().int().positive().optional(),
  npcId: z.number().int().positive().optional(),
});

export type UpdateQuestStepDto = z.infer<typeof updateQuestStepSchema>;
