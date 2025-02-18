import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  get() {
    return {
      stats: 'some stats',
    };
  }
}
