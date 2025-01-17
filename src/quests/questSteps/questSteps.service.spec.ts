import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { QuestStepsService } from './questSteps.service';
import { PrismaService } from 'src/prisma.service';
import { QuestStep } from '@prisma/client';
import { CreateQuestStepDto } from './dto/create-questStep.dto';
import { UpdateQuestStepDto } from './dto/update-questStep.dto';

describe('QuestStepsService', () => {
  let service: QuestStepsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestStepsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<QuestStepsService>(QuestStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all questSteps array', async () => {
      const allQuestSteps: QuestStep[] = [
        {
          id: 1,
          description: 'First',
          index: 1,
          questId: 10,
          roomId: 20,
          npcId: null,
        },
        {
          id: 2,
          description: 'Second',
          index: 2,
          questId: 10,
          roomId: 20,
          npcId: null,
        },
      ];

      prismaMock.questStep.findMany.mockResolvedValue(allQuestSteps);

      const result = await service.findAll();
      expect(result).toEqual(allQuestSteps);
      expect(prismaMock.questStep.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no questSteps', async () => {
      prismaMock.questStep.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.questStep.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the questStep if it exists', async () => {
      const existingQuestStep: QuestStep = {
        id: 1,
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
        npcId: null,
      };

      prismaMock.questStep.findUnique.mockResolvedValue(existingQuestStep);

      const result = await service.findOne(existingQuestStep.id);
      expect(result).toEqual(existingQuestStep);
      expect(prismaMock.questStep.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if questStep does not exist', async () => {
      prismaMock.questStep.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.questStep.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new questStep', async () => {
      const createDto: CreateQuestStepDto = {
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
      };
      const createdQuestStep: QuestStep = {
        id: 1,
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
        npcId: null,
      };

      prismaMock.questStep.create.mockResolvedValue(createdQuestStep);

      const result = await service.create(createDto);
      expect(result).toEqual(createdQuestStep);
      expect(prismaMock.questStep.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateQuestStepDto = {
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
      };

      prismaMock.questStep.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.questStep.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing questStep', async () => {
      const existingQuestStep: QuestStep = {
        id: 1,
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
        npcId: null,
      };
      const updateDto: UpdateQuestStepDto = { description: 'Updated' };
      const updatedQuestStep: QuestStep = {
        id: 1,
        description: 'Updated',
        index: 1,
        questId: 10,
        roomId: 20,
        npcId: null,
      };

      prismaMock.questStep.findUnique.mockResolvedValue(existingQuestStep);
      prismaMock.questStep.update.mockResolvedValue(updatedQuestStep);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedQuestStep);
      expect(prismaMock.questStep.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent questStep', async () => {
      const updateDto: UpdateQuestStepDto = {
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
      };

      prismaMock.questStep.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.questStep.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a questStep', async () => {
      const questStepToDelete: QuestStep = {
        id: 1,
        description: 'First',
        index: 1,
        questId: 10,
        roomId: 20,
        npcId: null,
      };

      prismaMock.questStep.findUnique.mockResolvedValue(questStepToDelete);
      prismaMock.questStep.delete.mockResolvedValue(questStepToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(questStepToDelete);
      expect(prismaMock.questStep.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.questStep.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent questStep', async () => {
      prismaMock.questStep.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.questStep.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.questStep.delete).not.toHaveBeenCalled();
    });
  });
});
