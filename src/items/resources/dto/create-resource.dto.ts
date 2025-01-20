import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @IsInt()
  @IsPositive()
  skillId: number;

  @IsNotEmpty()
  @IsBoolean()
  passive: boolean;
}
