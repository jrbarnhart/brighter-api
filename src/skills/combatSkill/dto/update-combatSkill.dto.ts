import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCombatSkillDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId?: number;
}
