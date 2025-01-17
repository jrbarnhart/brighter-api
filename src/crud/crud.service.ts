import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CrudService {
  constructor(private prisma: PrismaService) {}
}
