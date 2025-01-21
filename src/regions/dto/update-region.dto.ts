import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateRegionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name?: string;
}
