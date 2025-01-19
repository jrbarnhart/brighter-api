import { BankType } from '@prisma/client';
import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string(),
  regionId: z.number().int().positive(),
  craftingSkillIds: z.array(z.number().int().positive()).optional(),
  monsterIds: z.array(z.number().int().positive()).optional(),
  npcIds: z.array(z.number().int().positive()).optional(),
  resourceIds: z.array(z.number().int().positive()).optional(),
  questStepIds: z.array(z.number().int().positive()).optional(),
  banks: z.array(z.nativeEnum(BankType)).optional(),
  portal: z.boolean(),
  obelisk: z.boolean(),
});

export type CreateRoomDto = z.infer<typeof createRoomSchema>;
