import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateConsumableDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name?: string;
}
