import { z } from 'zod';

export const updateResourceSchema = z.object({
  name: z.string().optional(),
  skillId: z.number().int().positive().optional(),
  passive: z.boolean().optional(),
});

export type UpdateResourceDto = z.infer<typeof updateResourceSchema>;
