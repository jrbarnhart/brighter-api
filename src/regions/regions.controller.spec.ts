import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateRegionDto } from './dto/create-region.dto';
import { UnauthorizedException } from '@nestjs/common';

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

  describe('create', () => {
    it('should allow creation when user is authenticated', async () => {
      const createDto: CreateRegionDto = { name: 'Test Region' };

      jwtServiceMock.verifyAsync.mockResolvedValue({ userId: 1 });

      await controller.create(createDto);

      expect(regionsServiceMock.create).toHaveBeenCalledWith(createDto);
    });

    it('should reject when user is not authenticated', async () => {
      const createDto: CreateRegionDto = { name: 'Test Region' };

      jwtServiceMock.verifyAsync.mockRejectedValue(new Error('Unauthorized'));

      try {
        await controller.create(createDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
