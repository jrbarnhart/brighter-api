import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCombatSkillRequirementDto {
  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  skillId?: number;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  unlockLevel?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  description?: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  monsterVariantId?: number;
}
