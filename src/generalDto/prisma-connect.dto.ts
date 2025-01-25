import { ApiPropertyOptional } from '@nestjs/swagger';

export class ConnectDto {
  @ApiPropertyOptional()
  id: number;
}
