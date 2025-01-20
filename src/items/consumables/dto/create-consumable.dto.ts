import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConsumableDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
