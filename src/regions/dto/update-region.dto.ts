import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRegionDto {
  @IsString()
  @IsOptional()
  @MaxLength(256)
  name?: string;
}
