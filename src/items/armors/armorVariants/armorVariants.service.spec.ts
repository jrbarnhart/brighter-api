import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ArmorVariantsService } from './armorVariants.service';
import { PrismaService } from 'src/prisma.service';
import { ArmorVariant } from '@prisma/client';
import { CreateArmorVariantDto } from './dto/create-armorVariant.dto';
import { UpdateArmorVariantDto } from './dto/update-armorVariant.dto';

describe('ArmorVariantsService', () => {
  let service: ArmorVariantsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArmorVariantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ArmorVariantsService>(ArmorVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all armorVariants array', async () => {
      const allArmorVariants: ArmorVariant[] = [
        { id: 1, name: 'ArmorVariant One', armorId: 10 },
        { id: 2, name: 'ArmorVariant Two', armorId: 20 },
      ];

      prismaMock.armorVariant.findMany.mockResolvedValue(allArmorVariants);

      const result = await service.findAll();
      expect(result).toEqual(allArmorVariants);
      expect(prismaMock.armorVariant.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no armorVariants', async () => {
      prismaMock.armorVariant.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.armorVariant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the armorVariant if it exists', async () => {
      const existingArmorVariant: ArmorVariant = {
        id: 1,
        name: 'ArmorVariant One',
        armorId: 10,
      };

      prismaMock.armorVariant.findUnique.mockResolvedValue(
        existingArmorVariant,
      );

      const result = await service.findOne(existingArmorVariant.id);
      expect(result).toEqual(existingArmorVariant);
      expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if armorVariant does not exist', async () => {
      prismaMock.armorVariant.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new armorVariant', async () => {
      const createDto: CreateArmorVariantDto = {
        name: 'ArmorVariant One',
        armorId: 10,
      };
      const createdArmorVariant: ArmorVariant = {
        id: 1,
        name: 'ArmorVariant One',
        armorId: 10,
      };

      prismaMock.armorVariant.create.mockResolvedValue(createdArmorVariant);

      const result = await service.create(createDto);
      expect(result).toEqual(createdArmorVariant);
      expect(prismaMock.armorVariant.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateArmorVariantDto = {
        name: 'ArmorVariant One',
        armorId: 10,
      };

      prismaMock.armorVariant.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.armorVariant.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing armorVariant', async () => {
      const existingArmorVariant: ArmorVariant = {
        id: 1,
        name: 'ArmorVariant One',
        armorId: 10,
      };
      const updateDto: UpdateArmorVariantDto = { name: 'Updated ArmorVariant' };
      const updatedArmorVariant: ArmorVariant = {
        id: 1,
        name: 'Updated ArmorVariant',
        armorId: 10,
      };

      prismaMock.armorVariant.findUnique.mockResolvedValue(
        existingArmorVariant,
      );
      prismaMock.armorVariant.update.mockResolvedValue(updatedArmorVariant);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedArmorVariant);
      expect(prismaMock.armorVariant.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent armorVariant', async () => {
      const updateDto = { name: 'Updated ArmorVariant' };

      prismaMock.armorVariant.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.armorVariant.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a armorVariant', async () => {
      const armorVariantToDelete: ArmorVariant = {
        id: 1,
        name: 'ArmorVariant One',
        armorId: 10,
      };

      prismaMock.armorVariant.findUnique.mockResolvedValue(
        armorVariantToDelete,
      );
      prismaMock.armorVariant.delete.mockResolvedValue(armorVariantToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(armorVariantToDelete);
      expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.armorVariant.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent armorVariant', async () => {
      prismaMock.armorVariant.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.armorVariant.delete).not.toHaveBeenCalled();
    });
  });
});
