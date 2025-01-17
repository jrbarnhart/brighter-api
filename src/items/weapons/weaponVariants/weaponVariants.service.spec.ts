import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { WeaponVariantsService } from './weaponVariants.service';
import { PrismaService } from 'src/prisma.service';
import { WeaponVariant } from '@prisma/client';
import { CreateWeaponVariantDto } from './dto/create-weaponVariant.dto';
import { UpdateWeaponVariantDto } from './dto/update-weaponVariant.dto';

describe('WeaponVariantsService', () => {
  let service: WeaponVariantsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponVariantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<WeaponVariantsService>(WeaponVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all weaponVariants array', async () => {
      const allWeaponVariants: WeaponVariant[] = [
        { id: 1, name: 'WeaponVariant One', weaponId: 10, recipeId: null },
        { id: 2, name: 'WeaponVariant Two', weaponId: 20, recipeId: null },
      ];

      prismaMock.weaponVariant.findMany.mockResolvedValue(allWeaponVariants);

      const result = await service.findAll();
      expect(result).toEqual(allWeaponVariants);
      expect(prismaMock.weaponVariant.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no weaponVariants', async () => {
      prismaMock.weaponVariant.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.weaponVariant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the weaponVariant if it exists', async () => {
      const existingWeaponVariant: WeaponVariant = {
        id: 1,
        name: 'WeaponVariant One',
        weaponId: 10,
        recipeId: null,
      };

      prismaMock.weaponVariant.findUnique.mockResolvedValue(
        existingWeaponVariant,
      );

      const result = await service.findOne(existingWeaponVariant.id);
      expect(result).toEqual(existingWeaponVariant);
      expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if weaponVariant does not exist', async () => {
      prismaMock.weaponVariant.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new weaponVariant', async () => {
      const createDto: CreateWeaponVariantDto = {
        name: 'WeaponVariant One',
        weaponId: 10,
      };
      const createdWeaponVariant: WeaponVariant = {
        id: 1,
        name: 'WeaponVariant One',
        weaponId: 10,
        recipeId: null,
      };

      prismaMock.weaponVariant.create.mockResolvedValue(createdWeaponVariant);

      const result = await service.create(createDto);
      expect(result).toEqual(createdWeaponVariant);
      expect(prismaMock.weaponVariant.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateWeaponVariantDto = {
        name: 'WeaponVariant One',
        weaponId: 10,
      };

      prismaMock.weaponVariant.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.weaponVariant.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing weaponVariant', async () => {
      const existingWeaponVariant: WeaponVariant = {
        id: 1,
        name: 'WeaponVariant One',
        weaponId: 10,
        recipeId: null,
      };
      const updateDto: UpdateWeaponVariantDto = {
        name: 'Updated WeaponVariant',
      };
      const updatedWeaponVariant: WeaponVariant = {
        id: 1,
        name: 'Updated WeaponVariant',
        weaponId: 10,
        recipeId: null,
      };

      prismaMock.weaponVariant.findUnique.mockResolvedValue(
        existingWeaponVariant,
      );
      prismaMock.weaponVariant.update.mockResolvedValue(updatedWeaponVariant);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedWeaponVariant);
      expect(prismaMock.weaponVariant.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent weaponVariant', async () => {
      const updateDto = { name: 'Updated WeaponVariant' };

      prismaMock.weaponVariant.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.weaponVariant.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a weaponVariant', async () => {
      const weaponVariantToDelete: WeaponVariant = {
        id: 1,
        name: 'WeaponVariant One',
        weaponId: 10,
        recipeId: null,
      };

      prismaMock.weaponVariant.findUnique.mockResolvedValue(
        weaponVariantToDelete,
      );
      prismaMock.weaponVariant.delete.mockResolvedValue(weaponVariantToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(weaponVariantToDelete);
      expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.weaponVariant.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent weaponVariant', async () => {
      prismaMock.weaponVariant.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.weaponVariant.delete).not.toHaveBeenCalled();
    });
  });
});
