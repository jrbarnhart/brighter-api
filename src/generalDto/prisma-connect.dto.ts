import { ApiPropertyOptional } from '@nestjs/swagger';

export class ConnectDto {
  @ApiPropertyOptional()
  id: number;
}

/*
Use it like this:

  @ApiPropertyOptional({ type: [ConnectDto] })
  @IsOptional()
  @IsArray()
  @Type(() => ConnectDto)
  craftingSkills?: { connect: { id: number }[] };
*/
