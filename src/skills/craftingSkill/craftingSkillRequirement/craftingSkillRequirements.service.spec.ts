import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CraftingSkillRequirementsService } from './craftingSkillRequirements.service';
import { PrismaService } from 'src/prisma.service';
import { CraftingSkillRequirement } from '@prisma/client';
import { CreateCraftingSkillRequirementDto } from './dto/create-craftingSkillRequirement.dto';
import { UpdateCraftingSkillRequirementDto } from './dto/update-craftingSkillRequirement.dto';

describe('CraftingSkillRequirementsService', () => {
  let service: CraftingSkillRequirementsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CraftingSkillRequirementsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CraftingSkillRequirementsService>(
      CraftingSkillRequirementsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all craftingSkillRequirements array', async () => {
      const allCraftingSkillRequirements: CraftingSkillRequirement[] = [
        { id: 1, description: 'Requirement One', skillId: 10, unlockLevel: 1 },
        { id: 2, description: 'Requirement Two', skillId: 10, unlockLevel: 12 },
      ];

      prismaMock.craftingSkillRequirement.findMany.mockResolvedValue(
        allCraftingSkillRequirements,
      );

      const result = await service.findAll();
      expect(result).toEqual(allCraftingSkillRequirements);
      expect(
        prismaMock.craftingSkillRequirement.findMany,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no craftingSkillRequirements', async () => {
      prismaMock.craftingSkillRequirement.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(
        prismaMock.craftingSkillRequirement.findMany,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the craftingSkillRequirement if it exists', async () => {
      const existingCraftingSkillRequirement: CraftingSkillRequirement = {
        id: 1,
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.craftingSkillRequirement.findUnique.mockResolvedValue(
        existingCraftingSkillRequirement,
      );

      const result = await service.findOne(existingCraftingSkillRequirement.id);
      expect(result).toEqual(existingCraftingSkillRequirement);
      expect(
        prismaMock.craftingSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if craftingSkillRequirement does not exist', async () => {
      prismaMock.craftingSkillRequirement.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(
        prismaMock.craftingSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new craftingSkillRequirement', async () => {
      const createDto: CreateCraftingSkillRequirementDto = {
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };
      const createdCraftingSkillRequirement: CraftingSkillRequirement = {
        id: 1,
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.craftingSkillRequirement.create.mockResolvedValue(
        createdCraftingSkillRequirement,
      );

      const result = await service.create(createDto);
      expect(result).toEqual(createdCraftingSkillRequirement);
      expect(prismaMock.craftingSkillRequirement.create).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateCraftingSkillRequirementDto = {
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.craftingSkillRequirement.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.craftingSkillRequirement.create).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('update', () => {
    it('should update an existing craftingSkillRequirement', async () => {
      const existingCraftingSkillRequirement: CraftingSkillRequirement = {
        id: 1,
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };
      const updateDto: UpdateCraftingSkillRequirementDto = {
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };
      const updatedCraftingSkillRequirement: CraftingSkillRequirement = {
        id: 1,
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.craftingSkillRequirement.findUnique.mockResolvedValue(
        existingCraftingSkillRequirement,
      );
      prismaMock.craftingSkillRequirement.update.mockResolvedValue(
        updatedCraftingSkillRequirement,
      );

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedCraftingSkillRequirement);
      expect(prismaMock.craftingSkillRequirement.update).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw NotFoundException when updating non-existent craftingSkillRequirement', async () => {
      const updateDto: UpdateCraftingSkillRequirementDto = {
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.craftingSkillRequirement.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.craftingSkillRequirement.update).toHaveBeenCalledTimes(
        0,
      );
    });
  });

  describe('remove', () => {
    it('should delete a craftingSkillRequirement', async () => {
      const craftingSkillRequirementToDelete: CraftingSkillRequirement = {
        id: 1,
        description: 'Requirement One',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.craftingSkillRequirement.findUnique.mockResolvedValue(
        craftingSkillRequirementToDelete,
      );
      prismaMock.craftingSkillRequirement.delete.mockResolvedValue(
        craftingSkillRequirementToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(craftingSkillRequirementToDelete);
      expect(
        prismaMock.craftingSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(prismaMock.craftingSkillRequirement.delete).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw NotFoundException when deleting non-existent craftingSkillRequirement', async () => {
      prismaMock.craftingSkillRequirement.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(
        prismaMock.craftingSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(prismaMock.craftingSkillRequirement.delete).not.toHaveBeenCalled();
    });
  });
});
