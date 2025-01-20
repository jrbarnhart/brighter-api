import { IsNotEmpty, IsString, Max } from 'class-validator';

export class UpdateConsumableDto {
  @IsString()
  @IsNotEmpty()
  @Max(256)
  name?: string;
}
