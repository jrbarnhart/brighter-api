import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMiscItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;
}
