import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateQuestStepDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  index?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  description?: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  questId?: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  roomId?: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  npcId?: number;
}
