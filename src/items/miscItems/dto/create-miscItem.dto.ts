import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMiscItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @MinLength(1)
  name: string;
}
