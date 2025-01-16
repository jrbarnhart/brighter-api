import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, Region } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateRegionDto } from './dto/update-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';

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

    it('should propagate NotFoundException if region does not exist', async () => {
      regionsServiceMock.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should add a new region', async () => {
      const regionDto: CreateRegionDto = { name: 'New Region' };
      const region: Region = { id: 1, ...regionDto };

      regionsServiceMock.create.mockResolvedValue(region);

      expect(await controller.create(regionDto)).toBe(region);
    });

    it('should propagate a BadRequestException when region name already exists', async () => {
      const regionDto: CreateRegionDto = { name: 'New Region' };
      regionsServiceMock.create.mockRejectedValue(new BadRequestException());

      await expect(controller.create(regionDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update the region if it exists', async () => {
      const updateRegionDto: UpdateRegionDto = { name: 'Updated Region' };
      const updatedRegion: Region = { id: 1, name: 'Updated Region' };

      regionsServiceMock.update.mockResolvedValue(updatedRegion);

      expect(await controller.update(updatedRegion.id, updateRegionDto)).toBe(
        updatedRegion,
      );
    });

    it('should propagate a NotFoundException if the region does not exist', async () => {
      const updateRegionDto: UpdateRegionDto = { name: 'Updated Region' };
      regionsServiceMock.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(999, updateRegionDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete the region if it exists', async () => {
      const region: Region = { id: 1, name: 'Updated Region' };

      regionsServiceMock.remove.mockResolvedValue(region);

      expect(await controller.remove(region.id)).toBe(region);
    });

    it('should propagate NotFoundException if the region does not exist', async () => {
      regionsServiceMock.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });

    it('should propagate a BadRequestException if the region has rooms', async () => {
      regionsServiceMock.remove.mockRejectedValue(new BadRequestException());

      await expect(controller.remove(999)).rejects.toThrow(BadRequestException);
    });
  });
});
