import { Global, Logger, Module } from '@nestjs/common';

@Global()
@Module({
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
