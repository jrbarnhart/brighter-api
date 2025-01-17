import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GatheringSkillsService } from './gatheringSkills.service';
import { PrismaService } from 'src/prisma.service';
import { GatheringSkill } from '@prisma/client';
import { CreateGatheringSkillDto } from './dto/create-gatheringSkill.dto';
import { UpdateGatheringSkillDto } from './dto/update-gatheringSkill.dto';

describe('GatheringSkillsService', () => {
  let service: GatheringSkillsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GatheringSkillsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<GatheringSkillsService>(GatheringSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all gatheringSkills array', async () => {
      const allGatheringSkills: GatheringSkill[] = [
        { id: 1, name: 'GatheringSkill One', regionId: 10 },
        { id: 2, name: 'GatheringSkill Two', regionId: 10 },
      ];

      prismaMock.gatheringSkill.findMany.mockResolvedValue(allGatheringSkills);

      const result = await service.findAll();
      expect(result).toEqual(allGatheringSkills);
      expect(prismaMock.gatheringSkill.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no gatheringSkills', async () => {
      prismaMock.gatheringSkill.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.gatheringSkill.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the gatheringSkill if it exists', async () => {
      const existingGatheringSkill: GatheringSkill = {
        id: 1,
        name: 'GatheringSkill One',
        regionId: 10,
      };

      prismaMock.gatheringSkill.findUnique.mockResolvedValue(
        existingGatheringSkill,
      );

      const result = await service.findOne(existingGatheringSkill.id);
      expect(result).toEqual(existingGatheringSkill);
      expect(prismaMock.gatheringSkill.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if gatheringSkill does not exist', async () => {
      prismaMock.gatheringSkill.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.gatheringSkill.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new gatheringSkill', async () => {
      const createDto: CreateGatheringSkillDto = {
        name: 'GatheringSkill One',
        regionId: 10,
      };
      const createdGatheringSkill: GatheringSkill = {
        id: 1,
        name: 'GatheringSkill One',
        regionId: 10,
      };

      prismaMock.gatheringSkill.create.mockResolvedValue(createdGatheringSkill);

      const result = await service.create(createDto);
      expect(result).toEqual(createdGatheringSkill);
      expect(prismaMock.gatheringSkill.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateGatheringSkillDto = {
        name: 'GatheringSkill One',
        regionId: 10,
      };

      prismaMock.gatheringSkill.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.gatheringSkill.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing gatheringSkill', async () => {
      const existingGatheringSkill: GatheringSkill = {
        id: 1,
        name: 'GatheringSkill One',
        regionId: 10,
      };
      const updateDto: UpdateGatheringSkillDto = {
        name: 'Updated GatheringSkill',
      };
      const updatedGatheringSkill: GatheringSkill = {
        id: 1,
        name: 'Updated GatheringSkill',
        regionId: 10,
      };

      prismaMock.gatheringSkill.findUnique.mockResolvedValue(
        existingGatheringSkill,
      );
      prismaMock.gatheringSkill.update.mockResolvedValue(updatedGatheringSkill);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedGatheringSkill);
      expect(prismaMock.gatheringSkill.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent gatheringSkill', async () => {
      const updateDto: UpdateGatheringSkillDto = {
        name: 'Updated GatheringSkill',
      };

      prismaMock.gatheringSkill.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.gatheringSkill.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a gatheringSkill', async () => {
      const gatheringSkillToDelete: GatheringSkill = {
        id: 1,
        name: 'GatheringSkill One',
        regionId: 10,
      };

      prismaMock.gatheringSkill.findUnique.mockResolvedValue(
        gatheringSkillToDelete,
      );
      prismaMock.gatheringSkill.delete.mockResolvedValue(
        gatheringSkillToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(gatheringSkillToDelete);
      expect(prismaMock.gatheringSkill.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.gatheringSkill.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent gatheringSkill', async () => {
      prismaMock.gatheringSkill.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.gatheringSkill.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.gatheringSkill.delete).not.toHaveBeenCalled();
    });
  });
});
