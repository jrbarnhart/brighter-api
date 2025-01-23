import { IsString, MaxLength } from 'class-validator';

export class UpdateCraftingRecipeDto {
  @IsString()
  @MaxLength(256)
  name?: string;
}
