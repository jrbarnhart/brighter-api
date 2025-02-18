import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  controllers: [StatsController],
  providers: [PrismaService, StatsService],
})
export class StatsModule {}
