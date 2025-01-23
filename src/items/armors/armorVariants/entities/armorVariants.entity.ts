import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ArmorEntity } from '../../entities/armors.entity';

export class ArmorVariantEntity {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  armor: ArmorEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  armorId: number;

  //recipe: RecipeEntity;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  recipeId: number;

  //dropTables: DropTableEntity[]
  //vendors: VendorEntity[]
}
