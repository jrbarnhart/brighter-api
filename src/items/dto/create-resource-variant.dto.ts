import { z } from 'zod';

export const createResourceVariantSchema = z.object({
  name: z.string(),
  resourceId: z.number().int().positive(),
});

export type CreateResourceVariantDto = z.infer<
  typeof createResourceVariantSchema
>;
