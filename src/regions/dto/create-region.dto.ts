import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name: string;
}
