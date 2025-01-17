import { DynamicModule, Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';

@Module({})
export class CrudModule {
  static register(): DynamicModule {
    return {
      module: CrudModule,
      providers: [CrudService],
      exports: [CrudController],
    };
  }
}
