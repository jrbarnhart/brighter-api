import { z } from 'zod';

export const updateVendorSchema = z.object({
  npcId: z.number().int().positive().optional(),
  resourceVariantIds: z.array(z.number().int().positive()).optional(),
  consumableVariantIds: z.array(z.number().int().positive()).optional(),
  weaponVariantIds: z.array(z.number().int().positive()).optional(),
  armorVariantIds: z.array(z.number().int().positive()).optional(),
  miscItemsIds: z.array(z.number().int().positive()).optional(),
});

export type UpdateVendorDto = z.infer<typeof updateVendorSchema>;
