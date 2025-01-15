import { z } from 'zod';

export const updateQuestSchema = z.object({
  name: z.string().optional(),
});

export type UpdateQuestDto = z.infer<typeof updateQuestSchema>;
