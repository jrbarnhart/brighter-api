import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ConsumableVariantBaseEntity } from '../consumableVariants/entities/consumableVariants.entity';
import { CraftingSkillBaseEntity } from 'src/skills/craftingSkill/entities/craftingSkills.entity';

export class ConsumableEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  skill?: CraftingSkillBaseEntity;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId?: number;

  variants: ConsumableVariantBaseEntity[];
}

export class ConsumableBaseEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  skillId?: number;
}
