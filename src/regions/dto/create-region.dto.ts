import { z } from 'zod';

export const createRegionSchema = z.object({
  name: z.string(),
});

export type CreateRegionDto = z.infer<typeof createRegionSchema>;
