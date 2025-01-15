import { z } from 'zod';

export const createResourceSchema = z.object({
  name: z.string(),
  skillId: z.number().int().positive(),
  passive: z.boolean(),
});

export type CreateResourceDto = z.infer<typeof createResourceSchema>;
