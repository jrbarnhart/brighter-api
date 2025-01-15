import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Prisma, PrismaClient, Region } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('RegionsService', () => {
  let service: RegionsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<RegionsService>(RegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllRegions', () => {
    it('should return all regions array', async () => {
      const allRegions: Region[] = [
        { id: 1, name: 'Region One' },
        { id: 2, name: 'Region Two' },
      ];

      prismaMock.region.findMany.mockResolvedValue(allRegions);

      const result = await service.findAll();
      expect(result).toEqual(allRegions);
      expect(prismaMock.region.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.findMany).toHaveBeenCalledWith({
        include: { rooms: true },
      });
    });

    it('should return empty array if there are no regions', async () => {
      prismaMock.region.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.region.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.findMany).toHaveBeenCalledWith({
        include: { rooms: true },
      });
    });
  });

  describe('getRegionById', () => {
    it('should return the region if it exists', async () => {
      const existingRegion: Region = { id: 1, name: 'Region One' };

      prismaMock.region.findUnique.mockResolvedValue(existingRegion);
      const mockQueryArgs: Prisma.RegionFindUniqueArgs = {
        where: { id: existingRegion.id },
        include: { rooms: true },
      };

      const result = await service.findOne(existingRegion.id);
      expect(result).toEqual(existingRegion);
      expect(prismaMock.region.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.findUnique).toHaveBeenCalledWith(mockQueryArgs);
    });
  });

  it('should throw NotFoundException if region does not exist', async () => {
    prismaMock.region.findUnique.mockResolvedValue(null);
    const mockQueryArgs: Prisma.RegionFindUniqueArgs = {
      where: { id: 999 },
      include: { rooms: true },
    };

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(prismaMock.region.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.region.findUnique).toHaveBeenCalledWith(mockQueryArgs);
  });
});
