import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGatheringSkillRequirementDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  skillId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  unlockLevel: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(400)
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  resourceVariantId?: number;
}
