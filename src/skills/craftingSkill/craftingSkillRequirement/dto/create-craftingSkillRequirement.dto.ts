import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCraftingSkillRequirementDto {
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

  @IsString()
  @MaxLength(400)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  recipeId?: number | null;
}
