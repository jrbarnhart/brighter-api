import { Controller, Get } from '@nestjs/common';

import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { StatsEntity } from './entities/stats.entity';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get API stats',
    description: 'This gets counts and other info about all database records',
  })
  @ApiOkResponse({ description: 'Found stats', type: StatsEntity })
  find() {
    this.statsService.get();
  }
}
