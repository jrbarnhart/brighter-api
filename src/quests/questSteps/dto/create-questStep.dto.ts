import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateQuestStepDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  index: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @MinLength(1)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  questId: number;

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
