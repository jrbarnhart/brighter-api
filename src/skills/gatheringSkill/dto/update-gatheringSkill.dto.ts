import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateGatheringSkillDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(1)
  name?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  regionId?: number;
}
