import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateQuestStepDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  index?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  questId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  roomId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId?: number;
}
