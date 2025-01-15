import { z } from 'zod';

export const createVendorSchema = z.object({
  name: z.string(),
  npcId: z.number().int().positive(),
  resourceVariantIds: z.array(z.number().int().positive()).optional(),
  consumableVariantIds: z.array(z.number().int().positive()).optional(),
  weaponVariantIds: z.array(z.number().int().positive()).optional(),
  armorVariantIds: z.array(z.number().int().positive()).optional(),
  miscItemsIds: z.array(z.number().int().positive()).optional(),
});

export type CreateVendorDto = z.infer<typeof createVendorSchema>;
