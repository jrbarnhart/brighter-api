import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateMiscItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @MinLength(1)
  name?: string;
}
