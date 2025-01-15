import { z } from 'zod';

export const updateRegionSchema = z
  .object({
    name: z.string().optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'At least one property is required in body',
  });

export type UpdateRegionDto = z.infer<typeof updateRegionSchema>;
