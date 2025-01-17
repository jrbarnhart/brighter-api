import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CraftingSkillsService } from './craftingSkills.service';
import { PrismaService } from 'src/prisma.service';
import { CraftingSkill } from '@prisma/client';
import { CreateCraftingSkillDto } from './dto/create-craftingSkill.dto';
import { UpdateCraftingSkillDto } from './dto/update-craftingSkill.dto';

describe('CraftingSkillsService', () => {
  let service: CraftingSkillsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CraftingSkillsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CraftingSkillsService>(CraftingSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all craftingSkills array', async () => {
      const allCraftingSkills: CraftingSkill[] = [
        { id: 1, name: 'CraftingSkill One', regionId: 10 },
        { id: 2, name: 'CraftingSkill Two', regionId: 10 },
      ];

      prismaMock.craftingSkill.findMany.mockResolvedValue(allCraftingSkills);

      const result = await service.findAll();
      expect(result).toEqual(allCraftingSkills);
      expect(prismaMock.craftingSkill.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no craftingSkills', async () => {
      prismaMock.craftingSkill.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.craftingSkill.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the craftingSkill if it exists', async () => {
      const existingCraftingSkill: CraftingSkill = {
        id: 1,
        name: 'CraftingSkill One',
        regionId: 10,
      };

      prismaMock.craftingSkill.findUnique.mockResolvedValue(
        existingCraftingSkill,
      );

      const result = await service.findOne(existingCraftingSkill.id);
      expect(result).toEqual(existingCraftingSkill);
      expect(prismaMock.craftingSkill.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if craftingSkill does not exist', async () => {
      prismaMock.craftingSkill.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.craftingSkill.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new craftingSkill', async () => {
      const createDto: CreateCraftingSkillDto = {
        name: 'CraftingSkill One',
        regionId: 10,
      };
      const createdCraftingSkill: CraftingSkill = {
        id: 1,
        name: 'CraftingSkill One',
        regionId: 10,
      };

      prismaMock.craftingSkill.create.mockResolvedValue(createdCraftingSkill);

      const result = await service.create(createDto);
      expect(result).toEqual(createdCraftingSkill);
      expect(prismaMock.craftingSkill.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateCraftingSkillDto = {
        name: 'CraftingSkill One',
        regionId: 10,
      };

      prismaMock.craftingSkill.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.craftingSkill.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing craftingSkill', async () => {
      const existingCraftingSkill: CraftingSkill = {
        id: 1,
        name: 'CraftingSkill One',
        regionId: 10,
      };
      const updateDto: UpdateCraftingSkillDto = {
        name: 'Updated CraftingSkill',
      };
      const updatedCraftingSkill: CraftingSkill = {
        id: 1,
        name: 'Updated CraftingSkill',
        regionId: 10,
      };

      prismaMock.craftingSkill.findUnique.mockResolvedValue(
        existingCraftingSkill,
      );
      prismaMock.craftingSkill.update.mockResolvedValue(updatedCraftingSkill);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedCraftingSkill);
      expect(prismaMock.craftingSkill.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent craftingSkill', async () => {
      const updateDto: UpdateCraftingSkillDto = {
        name: 'Updated CraftingSkill',
      };

      prismaMock.craftingSkill.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.craftingSkill.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a craftingSkill', async () => {
      const craftingSkillToDelete: CraftingSkill = {
        id: 1,
        name: 'CraftingSkill One',
        regionId: 10,
      };

      prismaMock.craftingSkill.findUnique.mockResolvedValue(
        craftingSkillToDelete,
      );
      prismaMock.craftingSkill.delete.mockResolvedValue(craftingSkillToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(craftingSkillToDelete);
      expect(prismaMock.craftingSkill.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.craftingSkill.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent craftingSkill', async () => {
      prismaMock.craftingSkill.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.craftingSkill.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.craftingSkill.delete).not.toHaveBeenCalled();
    });
  });
});
