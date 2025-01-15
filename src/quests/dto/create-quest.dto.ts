import { z } from 'zod';

export const createQuestSchema = z.object({
  name: z.string(),
});

export type CreateQuestDto = z.infer<typeof createQuestSchema>;
