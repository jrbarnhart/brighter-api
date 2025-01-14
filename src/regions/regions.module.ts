import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RegionsController],
  providers: [RegionsService, PrismaService],
})
export class RegionsModule {}
