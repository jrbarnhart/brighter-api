import { Module } from '@nestjs/common';
import { NpcsService } from './npcs.service';
import { NpcsController } from './npcs.controller';

@Module({
  controllers: [NpcsController],
  providers: [NpcsService],
})
export class NpcsModule {}
