import { IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateConsumableDto {
  @IsString()
  @IsNotEmpty()
  @Max(256)
  name: string;
}
