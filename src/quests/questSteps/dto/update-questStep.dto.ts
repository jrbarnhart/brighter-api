import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
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
  @MinLength(1)
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
  roomId?: number | null;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  npcId?: number | null;
}
