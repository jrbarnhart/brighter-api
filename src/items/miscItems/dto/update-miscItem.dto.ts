import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateMiscItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name?: string;
}
