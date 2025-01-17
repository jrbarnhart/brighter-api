import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MonsterVariantsService } from './monsterVariants.service';
import { PrismaService } from 'src/prisma.service';
import { MonsterVariant } from '@prisma/client';
import { CreateMonsterVariantDto } from './dto/create-monsterVariant.dto';
import { UpdateMonsterVariantDto } from './dto/update-monsterVariant.dto';

describe('MonsterVariantsService', () => {
  let service: MonsterVariantsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonsterVariantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MonsterVariantsService>(MonsterVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all monsterVariants array', async () => {
      const allMonsterVariants: MonsterVariant[] = [
        {
          id: 1,
          name: 'MonsterVariant One',
          monsterId: 10,
          requirementId: null,
        },
        {
          id: 2,
          name: 'MonsterVariant Two',
          monsterId: 20,
          requirementId: null,
        },
      ];

      prismaMock.monsterVariant.findMany.mockResolvedValue(allMonsterVariants);

      const result = await service.findAll();
      expect(result).toEqual(allMonsterVariants);
      expect(prismaMock.monsterVariant.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no monsterVariants', async () => {
      prismaMock.monsterVariant.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.monsterVariant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the monsterVariant if it exists', async () => {
      const existingMonsterVariant: MonsterVariant = {
        id: 1,
        name: 'MonsterVariant One',
        monsterId: 10,
        requirementId: null,
      };

      prismaMock.monsterVariant.findUnique.mockResolvedValue(
        existingMonsterVariant,
      );

      const result = await service.findOne(existingMonsterVariant.id);
      expect(result).toEqual(existingMonsterVariant);
      expect(prismaMock.monsterVariant.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if monsterVariant does not exist', async () => {
      prismaMock.monsterVariant.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.monsterVariant.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new monsterVariant', async () => {
      const createDto: CreateMonsterVariantDto = {
        name: 'MonsterVariant One',
        monsterId: 10,
      };
      const createdMonsterVariant: MonsterVariant = {
        id: 1,
        name: 'MonsterVariant One',
        monsterId: 10,
        requirementId: null,
      };

      prismaMock.monsterVariant.create.mockResolvedValue(createdMonsterVariant);

      const result = await service.create(createDto);
      expect(result).toEqual(createdMonsterVariant);
      expect(prismaMock.monsterVariant.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateMonsterVariantDto = {
        name: 'MonsterVariant One',
        monsterId: 10,
      };

      prismaMock.monsterVariant.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.monsterVariant.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing monsterVariant', async () => {
      const existingMonsterVariant: MonsterVariant = {
        id: 1,
        name: 'MonsterVariant One',
        monsterId: 10,
        requirementId: null,
      };
      const updateDto: UpdateMonsterVariantDto = {
        name: 'Updated MonsterVariant',
      };
      const updatedMonsterVariant: MonsterVariant = {
        id: 1,
        name: 'Updated MonsterVariant',
        monsterId: 10,
        requirementId: null,
      };

      prismaMock.monsterVariant.findUnique.mockResolvedValue(
        existingMonsterVariant,
      );
      prismaMock.monsterVariant.update.mockResolvedValue(updatedMonsterVariant);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedMonsterVariant);
      expect(prismaMock.monsterVariant.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent monsterVariant', async () => {
      const updateDto = { name: 'Updated MonsterVariant' };

      prismaMock.monsterVariant.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.monsterVariant.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a monsterVariant', async () => {
      const monsterVariantToDelete: MonsterVariant = {
        id: 1,
        name: 'MonsterVariant One',
        monsterId: 10,
        requirementId: null,
      };

      prismaMock.monsterVariant.findUnique.mockResolvedValue(
        monsterVariantToDelete,
      );
      prismaMock.monsterVariant.delete.mockResolvedValue(
        monsterVariantToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(monsterVariantToDelete);
      expect(prismaMock.monsterVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.monsterVariant.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent monsterVariant', async () => {
      prismaMock.monsterVariant.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.monsterVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.monsterVariant.delete).not.toHaveBeenCalled();
    });
  });
});
