import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma.service';

@Controller('health')
export class HealthController {
  private wasUnhealthy = false;

  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private logger: Logger,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database', this.prismaService),
    ]);
  }
}
