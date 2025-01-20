import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateConsumableDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;
}
