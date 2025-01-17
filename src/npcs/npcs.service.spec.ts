import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { NpcsService } from './npcs.service';
import { PrismaService } from 'src/prisma.service';
import { NPC } from '@prisma/client';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';

describe('NpcsService', () => {
  let service: NpcsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NpcsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<NpcsService>(NpcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all npcs array', async () => {
      const allNpcs: NPC[] = [
        { id: 1, name: 'Npc One' },
        { id: 2, name: 'Npc Two' },
      ];

      prismaMock.nPC.findMany.mockResolvedValue(allNpcs);

      const result = await service.findAll();
      expect(result).toEqual(allNpcs);
      expect(prismaMock.nPC.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no npcs', async () => {
      prismaMock.nPC.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.nPC.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the npc if it exists', async () => {
      const existingNpc: NPC = {
        id: 1,
        name: 'Npc One',
      };

      prismaMock.nPC.findUnique.mockResolvedValue(existingNpc);

      const result = await service.findOne(existingNpc.id);
      expect(result).toEqual(existingNpc);
      expect(prismaMock.nPC.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if npc does not exist', async () => {
      prismaMock.nPC.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.nPC.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new npc', async () => {
      const createDto: CreateNpcDto = {
        name: 'Npc One',
      };
      const createdNpc: NPC = {
        id: 1,
        name: 'Npc One',
      };

      prismaMock.nPC.create.mockResolvedValue(createdNpc);

      const result = await service.create(createDto);
      expect(result).toEqual(createdNpc);
      expect(prismaMock.nPC.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateNpcDto = {
        name: 'Npc One',
      };

      prismaMock.nPC.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.nPC.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing npc', async () => {
      const existingNpc: NPC = {
        id: 1,
        name: 'Npc One',
      };
      const updateDto: UpdateNpcDto = { name: 'Updated Npc' };
      const updatedNpc: NPC = {
        id: 1,
        name: 'Updated Npc',
      };

      prismaMock.nPC.findUnique.mockResolvedValue(existingNpc);
      prismaMock.nPC.update.mockResolvedValue(updatedNpc);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedNpc);
      expect(prismaMock.nPC.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent npc', async () => {
      const updateDto: UpdateNpcDto = { name: 'Updated Npc' };

      prismaMock.nPC.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.nPC.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a npc', async () => {
      const npcToDelete: NPC = {
        id: 1,
        name: 'Npc One',
      };

      prismaMock.nPC.findUnique.mockResolvedValue(npcToDelete);
      prismaMock.nPC.delete.mockResolvedValue(npcToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(npcToDelete);
      expect(prismaMock.nPC.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.nPC.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent npc', async () => {
      prismaMock.nPC.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.nPC.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.nPC.delete).not.toHaveBeenCalled();
    });
  });
});
