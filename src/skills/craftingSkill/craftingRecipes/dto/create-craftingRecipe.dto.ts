import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCraftingRecipeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;
}
