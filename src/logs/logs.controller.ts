import { Controller, Get, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCombinedLogs() {
    return this.logsService.getCombinedLogs();
  }
}
