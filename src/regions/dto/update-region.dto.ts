import { IsOptional, IsString, MaxLength, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ConnectDto } from 'src/generalDto/prisma-connect.dto';

export class UpdateRegionDto {
  @IsString()
  @IsOptional()
  @MaxLength(256)
  name?: string;

  @ApiPropertyOptional({ type: [ConnectDto] })
  @IsOptional()
  @IsArray()
  @Type(() => ConnectDto)
  rooms?: { connect: { id: number }[] };

  @ApiPropertyOptional({ type: [ConnectDto] })
  @IsOptional()
  @IsArray()
  @Type(() => ConnectDto)
  combatSkills?: { connect: { id: number }[] };

  @ApiPropertyOptional({ type: [ConnectDto] })
  @IsOptional()
  @IsArray()
  @Type(() => ConnectDto)
  gatheringSkills?: { connect: { id: number }[] };

  @ApiPropertyOptional({ type: [ConnectDto] })
  @IsOptional()
  @IsArray()
  @Type(() => ConnectDto)
  craftingSkills?: { connect: { id: number }[] };
}
