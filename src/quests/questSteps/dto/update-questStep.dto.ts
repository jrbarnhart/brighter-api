import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateQuestStepDto {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  index?: number;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  questId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  roomId?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId?: number;
}
