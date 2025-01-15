import { z } from 'zod';

export const updateNpcSchema = z.object({
  name: z.string().optional(),
});

export type UpdateNpcDto = z.infer<typeof updateNpcSchema>;
