import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { QuestsService } from './quests.service';
import { PrismaService } from 'src/prisma.service';
import { Quest } from '@prisma/client';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';

describe('QuestsService', () => {
  let service: QuestsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<QuestsService>(QuestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all quests array', async () => {
      const allQuests: Quest[] = [
        { id: 1, name: 'Quest One', regionId: 0 },
        { id: 2, name: 'Quest Two', regionId: 0 },
      ];

      prismaMock.quest.findMany.mockResolvedValue(allQuests);

      const result = await service.findAll();
      expect(result).toEqual(allQuests);
      expect(prismaMock.quest.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no quests', async () => {
      prismaMock.quest.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.quest.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the quest if it exists', async () => {
      const existingQuest: Quest = {
        id: 1,
        name: 'Quest One',
        regionId: 0,
      };

      prismaMock.quest.findUnique.mockResolvedValue(existingQuest);

      const result = await service.findOne(existingQuest.id);
      expect(result).toEqual(existingQuest);
      expect(prismaMock.quest.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if quest does not exist', async () => {
      prismaMock.quest.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.quest.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new quest', async () => {
      const createDto: CreateQuestDto = {
        name: 'Quest One',
        regionId: 0,
      };
      const createdQuest: Quest = {
        id: 1,
        name: 'Quest One',
        regionId: 0,
      };

      prismaMock.quest.create.mockResolvedValue(createdQuest);

      const result = await service.create(createDto);
      expect(result).toEqual(createdQuest);
      expect(prismaMock.quest.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateQuestDto = {
        name: 'Quest One',
        regionId: 0,
      };

      prismaMock.quest.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.quest.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing quest', async () => {
      const existingQuest: Quest = {
        id: 1,
        name: 'Quest One',
        regionId: 0,
      };
      const updateDto: UpdateQuestDto = { name: 'Updated Quest' };
      const updatedQuest: Quest = {
        id: 1,
        name: 'Updated Quest',
        regionId: 0,
      };

      prismaMock.quest.findUnique.mockResolvedValue(existingQuest);
      prismaMock.quest.update.mockResolvedValue(updatedQuest);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedQuest);
      expect(prismaMock.quest.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent quest', async () => {
      const updateDto: UpdateQuestDto = { name: 'Updated Quest' };

      prismaMock.quest.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.quest.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a quest', async () => {
      const questToDelete: Quest = {
        id: 1,
        name: 'Quest One',
        regionId: 0,
      };

      prismaMock.quest.findUnique.mockResolvedValue(questToDelete);
      prismaMock.quest.delete.mockResolvedValue(questToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(questToDelete);
      expect(prismaMock.quest.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.quest.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent quest', async () => {
      prismaMock.quest.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.quest.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.quest.delete).not.toHaveBeenCalled();
    });
  });
});
