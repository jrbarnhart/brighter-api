import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, Region } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

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

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      const allRegions: Region[] = [{ id: 1, name: 'Region One' }];

      regionsServiceMock.findAll.mockResolvedValue(allRegions);

      expect(await controller.findAll()).toBe(allRegions);
    });

    it('should return empty array when there are no regions', async () => {
      const allRegions: Region[] = [];

      regionsServiceMock.findAll.mockResolvedValue(allRegions);

      expect(await controller.findAll()).toBe(allRegions);
    });
  });

  describe('findOne', () => {
    it('should return the region if it exists', async () => {
      const region: Region = { id: 1, name: 'Region One' };

      regionsServiceMock.findOne.mockResolvedValue(region);

      expect(await controller.findOne(region.id)).toBe(region);
    });

    it('should return NotFound exception if region does not exist', async () => {
      regionsServiceMock.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
