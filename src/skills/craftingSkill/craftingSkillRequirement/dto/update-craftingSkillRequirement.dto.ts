import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCraftingSkillRequirementDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  unlockLevel: number;

  @IsString()
  @MaxLength(400)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  recipeId?: number;
}
