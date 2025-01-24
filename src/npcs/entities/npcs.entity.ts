import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { VendorBaseEntity } from '../vendors/entities/vendors.entity';
import { QuestStepBaseEntity } from 'src/quests/questSteps/entities/questSteps.entity';
import { RoomBaseEntity } from 'src/rooms/entities/rooms.entity';

export class NpcEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  vendor?: VendorBaseEntity;

  questSteps: QuestStepBaseEntity[];

  rooms: RoomBaseEntity[];
}

export class NpcBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;
}
