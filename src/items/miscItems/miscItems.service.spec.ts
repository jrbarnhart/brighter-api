
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MiscItemsService } from './miscItems.service';
import { PrismaService } from 'src/prisma.service';
import { MiscItem } from '@prisma/client';
import { CreateMiscItemDto } from './dto/create-miscItem.dto';
import { UpdateMiscItemDto } from './dto/update-miscItem.dto';

describe('MiscItemsService', () => {
  let service: MiscItemsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MiscItemsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MiscItemsService>(MiscItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all miscItems array', async () => {
      const allMiscItems: MiscItem[] = [
        { id: 1, name: 'MiscItem One' },
        { id: 2, name: 'MiscItem Two' },
      ];

      prismaMock.miscItem.findMany.mockResolvedValue(allMiscItems);

      const result = await service.findAll();
      expect(result).toEqual(allMiscItems);
      expect(prismaMock.miscItem.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no miscItems', async () => {
      prismaMock.miscItem.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.miscItem.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the miscItem if it exists', async () => {
      const existingMiscItem: MiscItem = {
        id: 1,
        name: 'MiscItem One',
      };

      prismaMock.miscItem.findUnique.mockResolvedValue(existingMiscItem);

      const result = await service.findOne(existingMiscItem.id);
      expect(result).toEqual(existingMiscItem);
      expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if miscItem does not exist', async () => {
      prismaMock.miscItem.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new miscItem', async () => {
      const createDto: CreateMiscItemDto = {
        name: 'MiscItem One',
      };
      const createdMiscItem: MiscItem = {
        id: 1,
        name: 'MiscItem One',
      };

      prismaMock.miscItem.create.mockResolvedValue(createdMiscItem);

      const result = await service.create(createDto);
      expect(result).toEqual(createdMiscItem);
      expect(prismaMock.miscItem.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateMiscItemDto = {
        name: 'MiscItem One',
      };

      prismaMock.miscItem.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(prismaMock.miscItem.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing miscItem', async () => {
      const existingMiscItem: MiscItem = {
        id: 1,
        name: 'MiscItem One',
      };
      const updateDto: UpdateMiscItemDto = { name: 'Updated MiscItem' };
      const updatedMiscItem: MiscItem = {
        id: 1,
        name: 'Updated MiscItem',
      };

      prismaMock.miscItem.findUnique.mockResolvedValue(existingMiscItem);
      prismaMock.miscItem.update.mockResolvedValue(updatedMiscItem);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedMiscItem);
      expect(prismaMock.miscItem.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent miscItem', async () => {
      const updateDto = { name: 'Updated MiscItem' };

      prismaMock.miscItem.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
      expect(prismaMock.miscItem.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a miscItem', async () => {
      const miscItemToDelete: MiscItem = {
        id: 1,
        name: 'MiscItem One',
      };

      prismaMock.miscItem.findUnique.mockResolvedValue(miscItemToDelete);
      prismaMock.miscItem.delete.mockResolvedValue(miscItemToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(miscItemToDelete);
      expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.miscItem.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent miscItem', async () => {
      prismaMock.miscItem.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.miscItem.delete).not.toHaveBeenCalled();
    });
  });
});