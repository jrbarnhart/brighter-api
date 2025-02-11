import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNpcDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name: string;
}
