import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCombatSkillRequirementDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  unlockLevel?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  monsterVariantId?: number;
}
