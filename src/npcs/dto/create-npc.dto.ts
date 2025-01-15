import { z } from 'zod';

export const createNpcSchema = z.object({
  name: z.string(),
});

export type CreateNpcDto = z.infer<typeof createNpcSchema>;
