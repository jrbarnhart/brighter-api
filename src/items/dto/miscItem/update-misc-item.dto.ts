import { z } from 'zod';

export const updateMiscItemSchema = z.object({
  name: z.string().optional(),
});

export type UpdateMiscItemDto = z.infer<typeof updateMiscItemSchema>;
