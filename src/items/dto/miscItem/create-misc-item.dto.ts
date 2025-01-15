import { z } from 'zod';

export const createMiscItemSchema = z.object({
  name: z.string(),
});

export type CreateMiscItemDto = z.infer<typeof createMiscItemSchema>;
