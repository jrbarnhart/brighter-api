import { z } from 'zod';

export const createRegionSchema = z.object({
  name: z.string(),
  roomIds: z.array(z.number().int().positive()),
});

export type CreateRegionDto = z.infer<typeof createRegionSchema>;
