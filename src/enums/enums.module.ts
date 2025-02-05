import { Module } from '@nestjs/common';
import { EnumsController } from './enums.controller';

@Module({
  controllers: [EnumsController],
})
export class EnumsModule {}
