import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConsumableVariantsService } from './consumableVariants.service';
import { PrismaService } from 'src/prisma.service';
import { ConsumableVariant } from '@prisma/client';
import { CreateConsumableVariantDto } from './dto/create-consumableVariant.dto';
import { UpdateConsumableVariantDto } from './dto/update-consumableVariant.dto';

describe('ConsumableVariantsService', () => {
  let service: ConsumableVariantsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumableVariantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ConsumableVariantsService>(ConsumableVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all consumableVariants array', async () => {
      const allConsumableVariants: ConsumableVariant[] = [
        {
          id: 1,
          name: 'ConsumableVariant One',
          consumableId: 10,
        },
        {
          id: 2,
          name: 'ConsumableVariant Two',
          consumableId: 20,
        },
      ];

      prismaMock.consumableVariant.findMany.mockResolvedValue(
        allConsumableVariants,
      );

      const result = await service.findAll();
      expect(result).toEqual(allConsumableVariants);
      expect(prismaMock.consumableVariant.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no consumableVariants', async () => {
      prismaMock.consumableVariant.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.consumableVariant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the consumableVariant if it exists', async () => {
      const existingConsumableVariant: ConsumableVariant = {
        id: 1,
        name: 'ConsumableVariant One',
        consumableId: 10,
      };

      prismaMock.consumableVariant.findUnique.mockResolvedValue(
        existingConsumableVariant,
      );

      const result = await service.findOne(existingConsumableVariant.id);
      expect(result).toEqual(existingConsumableVariant);
      expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if consumableVariant does not exist', async () => {
      prismaMock.consumableVariant.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new consumableVariant', async () => {
      const createDto: CreateConsumableVariantDto = {
        name: 'ConsumableVariant One',
        consumableId: 10,
      };
      const createdConsumableVariant: ConsumableVariant = {
        id: 1,
        name: 'ConsumableVariant One',
        consumableId: 10,
      };

      prismaMock.consumableVariant.create.mockResolvedValue(
        createdConsumableVariant,
      );

      const result = await service.create(createDto);
      expect(result).toEqual(createdConsumableVariant);
      expect(prismaMock.consumableVariant.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateConsumableVariantDto = {
        name: 'ConsumableVariant One',
        consumableId: 10,
      };

      prismaMock.consumableVariant.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.consumableVariant.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing consumableVariant', async () => {
      const existingConsumableVariant: ConsumableVariant = {
        id: 1,
        name: 'ConsumableVariant One',
        consumableId: 10,
      };
      const updateDto: UpdateConsumableVariantDto = {
        name: 'Updated ConsumableVariant',
      };
      const updatedConsumableVariant: ConsumableVariant = {
        id: 1,
        name: 'Updated ConsumableVariant',
        consumableId: 10,
      };

      prismaMock.consumableVariant.findUnique.mockResolvedValue(
        existingConsumableVariant,
      );
      prismaMock.consumableVariant.update.mockResolvedValue(
        updatedConsumableVariant,
      );

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedConsumableVariant);
      expect(prismaMock.consumableVariant.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent consumableVariant', async () => {
      const updateDto = { name: 'Updated ConsumableVariant' };

      prismaMock.consumableVariant.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.consumableVariant.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a consumableVariant', async () => {
      const consumableVariantToDelete: ConsumableVariant = {
        id: 1,
        name: 'ConsumableVariant One',
        consumableId: 10,
      };

      prismaMock.consumableVariant.findUnique.mockResolvedValue(
        consumableVariantToDelete,
      );
      prismaMock.consumableVariant.delete.mockResolvedValue(
        consumableVariantToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(consumableVariantToDelete);
      expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.consumableVariant.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent consumableVariant', async () => {
      prismaMock.consumableVariant.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.consumableVariant.delete).not.toHaveBeenCalled();
    });
  });
});
