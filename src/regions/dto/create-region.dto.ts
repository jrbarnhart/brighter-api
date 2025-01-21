import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;
}
