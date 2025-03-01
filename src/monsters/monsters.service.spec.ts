import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { PrismaService } from 'src/prisma.service';
import { Monster } from '@prisma/client';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';

describe('MonstersService', () => {
  let service: MonstersService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonstersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<MonstersService>(MonstersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all monsters array', async () => {
      const allMonsters: Monster[] = [
        {
          id: 1,
          name: 'Monster One',
          attackElement: 'TEMPESTAE',
          immuneElement: 'TEMPESTAE',
          vulnerableElement: 'ARBORAE',
          passive: false,
          skillId: 10,
          regionId: 1,
        },
        {
          id: 2,
          name: 'Monster Two',
          attackElement: 'TEMPESTAE',
          immuneElement: 'TEMPESTAE',
          vulnerableElement: 'ARBORAE',
          passive: false,
          skillId: 10,
          regionId: 2,
        },
      ];

      prismaMock.monster.findMany.mockResolvedValue(allMonsters);

      const result = await service.findAll();
      expect(result).toEqual(allMonsters);
      expect(prismaMock.monster.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no monsters', async () => {
      prismaMock.monster.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.monster.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the monster if it exists', async () => {
      const existingMonster: Monster = {
        id: 1,
        name: 'Monster One',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };

      prismaMock.monster.findUnique.mockResolvedValue(existingMonster);

      const result = await service.findOne(existingMonster.id);
      expect(result).toEqual(existingMonster);
      expect(prismaMock.monster.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if monster does not exist', async () => {
      prismaMock.monster.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.monster.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new monster', async () => {
      const createDto: CreateMonsterDto = {
        name: 'Monster One',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };
      const createdMonster: Monster = {
        id: 1,
        name: 'Monster One',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };

      prismaMock.monster.create.mockResolvedValue(createdMonster);

      const result = await service.create(createDto);
      expect(result).toEqual(createdMonster);
      expect(prismaMock.monster.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateMonsterDto = {
        name: 'Monster One',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };

      prismaMock.monster.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.monster.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing monster', async () => {
      const existingMonster: Monster = {
        id: 1,
        name: 'Monster One',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };
      const updateDto: UpdateMonsterDto = { name: 'Updated Monster' };
      const updatedMonster: Monster = {
        id: 1,
        name: 'Updated Monster',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };

      prismaMock.monster.findUnique.mockResolvedValue(existingMonster);
      prismaMock.monster.update.mockResolvedValue(updatedMonster);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedMonster);
      expect(prismaMock.monster.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent monster', async () => {
      const updateDto = { name: 'Updated Monster' };

      prismaMock.monster.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.monster.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a monster', async () => {
      const monsterToDelete: Monster = {
        id: 1,
        name: 'Monster One',
        attackElement: 'TEMPESTAE',
        immuneElement: 'TEMPESTAE',
        vulnerableElement: 'ARBORAE',
        passive: false,
        skillId: 10,
        regionId: 1,
      };

      prismaMock.monster.findUnique.mockResolvedValue(monsterToDelete);
      prismaMock.monster.delete.mockResolvedValue(monsterToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(monsterToDelete);
      expect(prismaMock.monster.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.monster.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent monster', async () => {
      prismaMock.monster.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.monster.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.monster.delete).not.toHaveBeenCalled();
    });
  });
});
