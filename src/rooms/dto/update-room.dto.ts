import { z } from 'zod';

export const updateRoomSchema = z.object({
  name: z.string().optional(),
  regionId: z.number().int().positive().optional(),
  craftingSpotIds: z.array(z.number().int().positive()).optional(),
  monsterIds: z.array(z.number().int().positive()).optional(),
  npcIds: z.array(z.number().int().positive()).optional(),
  resourceIds: z.array(z.number().int().positive()).optional(),
  questStepIds: z.array(z.number().int().positive()).optional(),
  bankIds: z.array(z.number().int().positive()).optional(),
  portal: z.boolean().optional(),
  obelisk: z.boolean().optional(),
});

export type UpdateRoomDto = z.infer<typeof updateRoomSchema>;
