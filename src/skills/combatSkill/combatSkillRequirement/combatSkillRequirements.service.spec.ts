import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CombatSkillRequirementsService } from './combatSkillRequirements.service';
import { PrismaService } from 'src/prisma.service';
import { CombatSkillRequirement } from '@prisma/client';
import { CreateCombatSkillRequirementDto } from './dto/create-combatSkillRequirement.dto';
import { UpdateCombatSkillRequirementDto } from './dto/update-combatSkillRequirement.dto';

describe('CombatSkillRequirementsService', () => {
  let service: CombatSkillRequirementsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombatSkillRequirementsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CombatSkillRequirementsService>(
      CombatSkillRequirementsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all combatSkillRequirements array', async () => {
      const allCombatSkillRequirements: CombatSkillRequirement[] = [
        {
          id: 1,
          description: 'Unlock Goblins',
          skillId: 10,
          unlockLevel: 1,
          monsterVariantId: null,
        },
        {
          id: 2,
          description: 'Unlock Deathcrows',
          skillId: 10,
          unlockLevel: 12,
          monsterVariantId: null,
        },
      ];

      prismaMock.combatSkillRequirement.findMany.mockResolvedValue(
        allCombatSkillRequirements,
      );

      const result = await service.findAll();
      expect(result).toEqual(allCombatSkillRequirements);
      expect(prismaMock.combatSkillRequirement.findMany).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should return empty array if there are no combatSkillRequirements', async () => {
      prismaMock.combatSkillRequirement.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.combatSkillRequirement.findMany).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('findOne', () => {
    it('should return the combatSkillRequirement if it exists', async () => {
      const existingCombatSkillRequirement: CombatSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        monsterVariantId: null,
      };

      prismaMock.combatSkillRequirement.findUnique.mockResolvedValue(
        existingCombatSkillRequirement,
      );

      const result = await service.findOne(existingCombatSkillRequirement.id);
      expect(result).toEqual(existingCombatSkillRequirement);
      expect(
        prismaMock.combatSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if combatSkillRequirement does not exist', async () => {
      prismaMock.combatSkillRequirement.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(
        prismaMock.combatSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new combatSkillRequirement', async () => {
      const createDto: CreateCombatSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };
      const createdCombatSkillRequirement: CombatSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        monsterVariantId: null,
      };

      prismaMock.combatSkillRequirement.create.mockResolvedValue(
        createdCombatSkillRequirement,
      );

      const result = await service.create(createDto);
      expect(result).toEqual(createdCombatSkillRequirement);
      expect(prismaMock.combatSkillRequirement.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateCombatSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.combatSkillRequirement.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.combatSkillRequirement.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing combatSkillRequirement', async () => {
      const existingCombatSkillRequirement: CombatSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        monsterVariantId: null,
      };
      const updateDto: UpdateCombatSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };
      const updatedCombatSkillRequirement: CombatSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        monsterVariantId: null,
      };

      prismaMock.combatSkillRequirement.findUnique.mockResolvedValue(
        existingCombatSkillRequirement,
      );
      prismaMock.combatSkillRequirement.update.mockResolvedValue(
        updatedCombatSkillRequirement,
      );

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedCombatSkillRequirement);
      expect(prismaMock.combatSkillRequirement.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent combatSkillRequirement', async () => {
      const updateDto: UpdateCombatSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.combatSkillRequirement.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.combatSkillRequirement.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a combatSkillRequirement', async () => {
      const combatSkillRequirementToDelete: CombatSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        monsterVariantId: null,
      };

      prismaMock.combatSkillRequirement.findUnique.mockResolvedValue(
        combatSkillRequirementToDelete,
      );
      prismaMock.combatSkillRequirement.delete.mockResolvedValue(
        combatSkillRequirementToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(combatSkillRequirementToDelete);
      expect(
        prismaMock.combatSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(prismaMock.combatSkillRequirement.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent combatSkillRequirement', async () => {
      prismaMock.combatSkillRequirement.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(
        prismaMock.combatSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(prismaMock.combatSkillRequirement.delete).not.toHaveBeenCalled();
    });
  });
});
