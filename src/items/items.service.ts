import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  find() {
    throw new BadRequestException(
      'Cannot directly query items. Valid use: items/monsters',
    );
  }
}
