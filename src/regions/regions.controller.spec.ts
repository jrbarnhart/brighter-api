import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('RegionsController', () => {
  let controller: RegionsController;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let jwtServiceMock: DeepMockProxy<JwtService>;
  let configServiceMock: DeepMockProxy<ConfigService>;
  let regionsServiceMock: DeepMockProxy<RegionsService>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    jwtServiceMock = mockDeep<JwtService>();
    configServiceMock = mockDeep<ConfigService>();
    regionsServiceMock = mockDeep<RegionsService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
      providers: [
        { provide: RegionsService, useValue: regionsServiceMock },
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get<RegionsController>(RegionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
