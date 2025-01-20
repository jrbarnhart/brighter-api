import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateConsumableDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
