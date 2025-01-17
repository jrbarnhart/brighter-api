import { Module } from '@nestjs/common';
import { NpcsController } from './npcs.controller';
import { NpcsService } from './npcs.service';
import { VendorsController } from './vendors/vendors.controller';
import { VendorsService } from './vendors/vendors.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VendorsController, NpcsController],
  providers: [PrismaService, VendorsService, NpcsService],
})
export class NpcsModule {}
