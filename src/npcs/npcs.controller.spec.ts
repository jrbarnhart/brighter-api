import { Test, TestingModule } from '@nestjs/testing';
import { NpcsController } from './npcs.controller';
import { NpcsService } from './npcs.service';

describe('NpcsController', () => {
  let controller: NpcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpcsController],
      providers: [NpcsService],
    }).compile();

    controller = module.get<NpcsController>(NpcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
