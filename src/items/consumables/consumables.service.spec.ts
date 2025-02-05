import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConsumablesService } from './consumables.service';
import { PrismaService } from 'src/prisma.service';
import { Consumable } from '@prisma/client';
import { CreateConsumableDto } from './dto/create-consumable.dto';
import { UpdateConsumableDto } from './dto/update-consumable.dto';

describe('ConsumablesService', () => {
  let service: ConsumablesService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumablesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ConsumablesService>(ConsumablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all consumables array', async () => {
      const allConsumables: Consumable[] = [
        { id: 1, name: 'Consumable One', skillId: null },
        { id: 2, name: 'Consumable Two', skillId: null },
      ];

      prismaMock.consumable.findMany.mockResolvedValue(allConsumables);

      const result = await service.findAll();
      expect(result).toEqual(allConsumables);
      expect(prismaMock.consumable.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no consumables', async () => {
      prismaMock.consumable.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.consumable.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the consumable if it exists', async () => {
      const existingConsumable: Consumable = {
        id: 1,
        name: 'Consumable One',
        skillId: null,
      };

      prismaMock.consumable.findUnique.mockResolvedValue(existingConsumable);

      const result = await service.findOne(existingConsumable.id);
      expect(result).toEqual(existingConsumable);
      expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if consumable does not exist', async () => {
      prismaMock.consumable.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new consumable', async () => {
      const createDto: CreateConsumableDto = {
        name: 'Consumable One',
      };
      const createdConsumable: Consumable = {
        id: 1,
        name: 'Consumable One',
        skillId: null,
      };

      prismaMock.consumable.create.mockResolvedValue(createdConsumable);

      const result = await service.create(createDto);
      expect(result).toEqual(createdConsumable);
      expect(prismaMock.consumable.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateConsumableDto = {
        name: 'Consumable One',
      };

      prismaMock.consumable.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.consumable.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing consumable', async () => {
      const existingConsumable: Consumable = {
        id: 1,
        name: 'Consumable One',
        skillId: null,
      };
      const updateDto: UpdateConsumableDto = { name: 'Updated Consumable' };
      const updatedConsumable: Consumable = {
        id: 1,
        name: 'Updated Consumable',
        skillId: null,
      };

      prismaMock.consumable.findUnique.mockResolvedValue(existingConsumable);
      prismaMock.consumable.update.mockResolvedValue(updatedConsumable);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedConsumable);
      expect(prismaMock.consumable.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent consumable', async () => {
      const updateDto = { name: 'Updated Consumable' };

      prismaMock.consumable.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.consumable.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a consumable', async () => {
      const consumableToDelete: Consumable = {
        id: 1,
        name: 'Consumable One',
        skillId: null,
      };

      prismaMock.consumable.findUnique.mockResolvedValue(consumableToDelete);
      prismaMock.consumable.delete.mockResolvedValue(consumableToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(consumableToDelete);
      expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.consumable.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent consumable', async () => {
      prismaMock.consumable.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.consumable.delete).not.toHaveBeenCalled();
    });
  });
});
