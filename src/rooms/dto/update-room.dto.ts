import { BankType } from '@prisma/client';
import { z } from 'zod';

export const updateRoomSchema = z
  .object({
    name: z.string().optional(),
    regionId: z.number().int().positive().optional(),
    craftingSkillIds: z.array(z.number().int().positive()).optional(),
    monsterIds: z.array(z.number().int().positive()).optional(),
    npcIds: z.array(z.number().int().positive()).optional(),
    resourceIds: z.array(z.number().int().positive()).optional(),
    questStepIds: z.array(z.number().int().positive()).optional(),
    bankIds: z.array(z.nativeEnum(BankType)).optional(),
    portal: z.boolean().optional(),
    obelisk: z.boolean().optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'At least one property is required in body',
  });

export type UpdateRoomDto = z.infer<typeof updateRoomSchema>;
