import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  @IsOptional()
  @MaxLength(256)
  @MinLength(1)
  name?: string;
}
