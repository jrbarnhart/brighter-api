import { z } from 'zod';

export const createConsumableSchema = z.object({
  name: z.string(),
});

export type CreateConsumableDto = z.infer<typeof createConsumableSchema>;
