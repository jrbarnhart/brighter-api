import { z } from 'zod';

export const updateResourceVariantSchema = z.object({
  name: z.string().optional(),
  resourceId: z.number().int().positive().optional(),
});

export type UpdateResourceVariantDto = z.infer<
  typeof updateResourceVariantSchema
>;
