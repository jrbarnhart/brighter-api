import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Prisma, PrismaClient, Region } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

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

  describe('create', () => {
    it('should create a new region', async () => {
      const createDto: CreateRegionDto = { name: 'New Region' };
      const createdRegion: Region = { id: 1, name: createDto.name };

      prismaMock.region.create.mockResolvedValue(createdRegion);

      const result = await service.create(createDto);
      expect(result).toEqual(createdRegion);
      expect(prismaMock.region.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateRegionDto = { name: 'Existing Region' };
      prismaMock.region.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.region.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing region', async () => {
      const existingRegion: Prisma.RegionGetPayload<{
        include: { rooms: true };
      }> = { id: 1, name: 'Room One', rooms: [] };
      const updateDto: UpdateRegionDto = { name: 'Updated Region' };
      const updatedRegion: Region = { id: 1, name: updateDto.name as string };

      prismaMock.region.findUnique.mockResolvedValue(existingRegion);
      prismaMock.region.update.mockResolvedValue(updatedRegion);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedRegion);
      expect(prismaMock.region.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
    });

    it('should throw NotFoundException when updating non-existent region', async () => {
      const updateDto = { name: 'Updated Region' };
      prismaMock.region.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.region.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a region without rooms', async () => {
      const regionToDelete: Region & { rooms: [] } = {
        id: 1,
        name: 'Region to Delete',
        rooms: [],
      };

      prismaMock.region.findUnique.mockResolvedValue(regionToDelete);
      prismaMock.region.delete.mockResolvedValue(regionToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(regionToDelete);
      expect(prismaMock.region.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when deleting non-existent region', async () => {
      prismaMock.region.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.region.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.delete).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when deleting region with rooms', async () => {
      const regionWithRooms: Region & { rooms: any[] } = {
        id: 1,
        name: 'Region with Rooms',
        rooms: [{ id: 1, name: 'Room 1' }],
      };

      prismaMock.region.findUnique.mockResolvedValue(regionWithRooms);

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
      expect(prismaMock.region.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.region.delete).not.toHaveBeenCalled();
    });
  });
});
