import { z } from 'zod';

export const updateConsumableSchema = z.object({
  name: z.string().optional(),
});

export type UpdateConsumableDto = z.infer<typeof updateConsumableSchema>;
