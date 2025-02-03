import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GatheringSkillRequirementsService } from './gatheringSkillRequirements.service';
import { PrismaService } from 'src/prisma.service';
import { GatheringSkillRequirement } from '@prisma/client';
import { CreateGatheringSkillRequirementDto } from './dto/create-gatheringSkillRequirement.dto';
import { UpdateGatheringSkillRequirementDto } from './dto/update-gatheringSkillRequirement.dto';

describe('GatheringSkillRequirementsService', () => {
  let service: GatheringSkillRequirementsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatheringSkillRequirementsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<GatheringSkillRequirementsService>(
      GatheringSkillRequirementsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all gatheringSkillRequirements array', async () => {
      const allGatheringSkillRequirements: GatheringSkillRequirement[] = [
        {
          id: 1,
          description: 'Unlock Goblins',
          skillId: 10,
          unlockLevel: 1,
          resourceVariantId: null,
        },
        {
          id: 2,
          description: 'Unlock Deathcrows',
          skillId: 10,
          unlockLevel: 1,
          resourceVariantId: null,
        },
      ];

      prismaMock.gatheringSkillRequirement.findMany.mockResolvedValue(
        allGatheringSkillRequirements,
      );

      const result = await service.findAll();
      expect(result).toEqual(allGatheringSkillRequirements);
      expect(
        prismaMock.gatheringSkillRequirement.findMany,
      ).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no gatheringSkillRequirements', async () => {
      prismaMock.gatheringSkillRequirement.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(
        prismaMock.gatheringSkillRequirement.findMany,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the gatheringSkillRequirement if it exists', async () => {
      const existingGatheringSkillRequirement: GatheringSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        resourceVariantId: null,
      };

      prismaMock.gatheringSkillRequirement.findUnique.mockResolvedValue(
        existingGatheringSkillRequirement,
      );

      const result = await service.findOne(
        existingGatheringSkillRequirement.id,
      );
      expect(result).toEqual(existingGatheringSkillRequirement);
      expect(
        prismaMock.gatheringSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if gatheringSkillRequirement does not exist', async () => {
      prismaMock.gatheringSkillRequirement.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(
        prismaMock.gatheringSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new gatheringSkillRequirement', async () => {
      const createDto: CreateGatheringSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };
      const createdGatheringSkillRequirement: GatheringSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        resourceVariantId: null,
      };

      prismaMock.gatheringSkillRequirement.create.mockResolvedValue(
        createdGatheringSkillRequirement,
      );

      const result = await service.create(createDto);
      expect(result).toEqual(createdGatheringSkillRequirement);
      expect(prismaMock.gatheringSkillRequirement.create).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateGatheringSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.gatheringSkillRequirement.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.gatheringSkillRequirement.create).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('update', () => {
    it('should update an existing gatheringSkillRequirement', async () => {
      const existingGatheringSkillRequirement: GatheringSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        resourceVariantId: null,
      };
      const updateDto: UpdateGatheringSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };
      const updatedGatheringSkillRequirement: GatheringSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        resourceVariantId: null,
      };

      prismaMock.gatheringSkillRequirement.findUnique.mockResolvedValue(
        existingGatheringSkillRequirement,
      );
      prismaMock.gatheringSkillRequirement.update.mockResolvedValue(
        updatedGatheringSkillRequirement,
      );

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedGatheringSkillRequirement);
      expect(prismaMock.gatheringSkillRequirement.update).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw NotFoundException when updating non-existent gatheringSkillRequirement', async () => {
      const updateDto: UpdateGatheringSkillRequirementDto = {
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
      };

      prismaMock.gatheringSkillRequirement.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.gatheringSkillRequirement.update).toHaveBeenCalledTimes(
        0,
      );
    });
  });

  describe('remove', () => {
    it('should delete a gatheringSkillRequirement', async () => {
      const gatheringSkillRequirementToDelete: GatheringSkillRequirement = {
        id: 1,
        description: 'Unlock Goblins',
        skillId: 10,
        unlockLevel: 1,
        resourceVariantId: null,
      };

      prismaMock.gatheringSkillRequirement.findUnique.mockResolvedValue(
        gatheringSkillRequirementToDelete,
      );
      prismaMock.gatheringSkillRequirement.delete.mockResolvedValue(
        gatheringSkillRequirementToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(gatheringSkillRequirementToDelete);
      expect(
        prismaMock.gatheringSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(prismaMock.gatheringSkillRequirement.delete).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should throw NotFoundException when deleting non-existent gatheringSkillRequirement', async () => {
      prismaMock.gatheringSkillRequirement.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(
        prismaMock.gatheringSkillRequirement.findUnique,
      ).toHaveBeenCalledTimes(1);
      expect(
        prismaMock.gatheringSkillRequirement.delete,
      ).not.toHaveBeenCalled();
    });
  });
});
