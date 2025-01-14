import { z } from 'zod';

export const updateRegionSchema = z.object({
  name: z.string().optional(),
});

export type UpdateRegionDto = z.infer<typeof updateRegionSchema>;
