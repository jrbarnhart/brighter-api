import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNpcDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;
}
