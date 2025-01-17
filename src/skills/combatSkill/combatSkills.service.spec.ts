import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CombatSkillsService } from './combatSkills.service';
import { PrismaService } from 'src/prisma.service';
import { CombatSkill } from '@prisma/client';
import { CreateCombatSkillDto } from './dto/create-combatSkill.dto';
import { UpdateCombatSkillDto } from './dto/update-combatSkill.dto';

describe('CombatSkillsService', () => {
  let service: CombatSkillsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombatSkillsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CombatSkillsService>(CombatSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all combatSkills array', async () => {
      const allCombatSkills: CombatSkill[] = [
        { id: 1, name: 'CombatSkill One', regionId: 10 },
        { id: 2, name: 'CombatSkill Two', regionId: 10 },
      ];

      prismaMock.combatSkill.findMany.mockResolvedValue(allCombatSkills);

      const result = await service.findAll();
      expect(result).toEqual(allCombatSkills);
      expect(prismaMock.combatSkill.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no combatSkills', async () => {
      prismaMock.combatSkill.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.combatSkill.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the combatSkill if it exists', async () => {
      const existingCombatSkill: CombatSkill = {
        id: 1,
        name: 'CombatSkill One',
        regionId: 10,
      };

      prismaMock.combatSkill.findUnique.mockResolvedValue(existingCombatSkill);

      const result = await service.findOne(existingCombatSkill.id);
      expect(result).toEqual(existingCombatSkill);
      expect(prismaMock.combatSkill.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if combatSkill does not exist', async () => {
      prismaMock.combatSkill.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.combatSkill.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new combatSkill', async () => {
      const createDto: CreateCombatSkillDto = {
        name: 'CombatSkill One',
        regionId: 10,
      };
      const createdCombatSkill: CombatSkill = {
        id: 1,
        name: 'CombatSkill One',
        regionId: 10,
      };

      prismaMock.combatSkill.create.mockResolvedValue(createdCombatSkill);

      const result = await service.create(createDto);
      expect(result).toEqual(createdCombatSkill);
      expect(prismaMock.combatSkill.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateCombatSkillDto = {
        name: 'CombatSkill One',
        regionId: 10,
      };

      prismaMock.combatSkill.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.combatSkill.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing combatSkill', async () => {
      const existingCombatSkill: CombatSkill = {
        id: 1,
        name: 'CombatSkill One',
        regionId: 10,
      };
      const updateDto: UpdateCombatSkillDto = { name: 'Updated CombatSkill' };
      const updatedCombatSkill: CombatSkill = {
        id: 1,
        name: 'Updated CombatSkill',
        regionId: 10,
      };

      prismaMock.combatSkill.findUnique.mockResolvedValue(existingCombatSkill);
      prismaMock.combatSkill.update.mockResolvedValue(updatedCombatSkill);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedCombatSkill);
      expect(prismaMock.combatSkill.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent combatSkill', async () => {
      const updateDto: UpdateCombatSkillDto = { name: 'Updated CombatSkill' };

      prismaMock.combatSkill.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.combatSkill.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a combatSkill', async () => {
      const combatSkillToDelete: CombatSkill = {
        id: 1,
        name: 'CombatSkill One',
        regionId: 10,
      };

      prismaMock.combatSkill.findUnique.mockResolvedValue(combatSkillToDelete);
      prismaMock.combatSkill.delete.mockResolvedValue(combatSkillToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(combatSkillToDelete);
      expect(prismaMock.combatSkill.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.combatSkill.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent combatSkill', async () => {
      prismaMock.combatSkill.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.combatSkill.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.combatSkill.delete).not.toHaveBeenCalled();
    });
  });
});
