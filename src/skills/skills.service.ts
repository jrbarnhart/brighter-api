import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  find() {
    throw new BadRequestException(
      'Cannot directly query skills. Valid use: skills/gathering',
    );
  }
}
