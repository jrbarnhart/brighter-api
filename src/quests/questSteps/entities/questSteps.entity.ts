import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { NpcBaseEntity } from 'src/npcs/entities/npcs.entity';
import { QuestBaseEntity } from 'src/quests/entities/quests.entity';
import { RoomBaseEntity } from 'src/rooms/entities/rooms.entity';

export class QuestStepEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  index: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  description: string;

  quest: QuestBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  questId: number;

  room?: RoomBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  roomId: number | null;

  npc?: NpcBaseEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId: number | null;
}

export class QuestStepBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  index: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  questId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  roomId: number | null;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId: number | null;
}
