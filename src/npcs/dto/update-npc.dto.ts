import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateNpcDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;
}
