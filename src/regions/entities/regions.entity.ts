import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { RoomEntity } from 'src/rooms/entities/rooms.entity';

export class RegionEntity {
  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  rooms: RoomEntity[];
}
