import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { PrismaService } from 'src/prisma.service';
import { Armor } from '@prisma/client';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';

describe('ArmorsService', () => {
  let service: ArmorsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArmorsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ArmorsService>(ArmorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all armors array', async () => {
      const allArmors: Armor[] = [
        { id: 1, name: 'Armor One', faction: 'HAMMERMAGE', slot: 'TORSO' },
        { id: 2, name: 'Armor Two', faction: 'HAMMERMAGE', slot: 'HEAD' },
      ];

      prismaMock.armor.findMany.mockResolvedValue(allArmors);

      const result = await service.findAll();
      expect(result).toEqual(allArmors);
      expect(prismaMock.armor.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no armors', async () => {
      prismaMock.armor.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.armor.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the armor if it exists', async () => {
      const existingArmor: Armor = {
        id: 1,
        name: 'Armor One',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };

      prismaMock.armor.findUnique.mockResolvedValue(existingArmor);

      const result = await service.findOne(existingArmor.id);
      expect(result).toEqual(existingArmor);
      expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if armor does not exist', async () => {
      prismaMock.armor.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new armor', async () => {
      const createDto: CreateArmorDto = {
        name: 'Armor One',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };
      const createdArmor: Armor = {
        id: 1,
        name: 'Armor One',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };

      prismaMock.armor.create.mockResolvedValue(createdArmor);

      const result = await service.create(createDto);
      expect(result).toEqual(createdArmor);
      expect(prismaMock.armor.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateArmorDto = {
        name: 'Armor One',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };

      prismaMock.armor.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.armor.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing armor', async () => {
      const existingArmor: Armor = {
        id: 1,
        name: 'Armor One',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };
      const updateDto: UpdateArmorDto = { name: 'Updated Armor' };
      const updatedArmor: Armor = {
        id: 1,
        name: 'Updated Armor',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };

      prismaMock.armor.findUnique.mockResolvedValue(existingArmor);
      prismaMock.armor.update.mockResolvedValue(updatedArmor);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedArmor);
      expect(prismaMock.armor.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent armor', async () => {
      const updateDto = { name: 'Updated Armor' };

      prismaMock.armor.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.armor.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a armor', async () => {
      const armorToDelete: Armor = {
        id: 1,
        name: 'Armor One',
        faction: 'HAMMERMAGE',
        slot: 'TORSO',
      };

      prismaMock.armor.findUnique.mockResolvedValue(armorToDelete);
      prismaMock.armor.delete.mockResolvedValue(armorToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(armorToDelete);
      expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.armor.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent armor', async () => {
      prismaMock.armor.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.armor.delete).not.toHaveBeenCalled();
    });
  });
});
