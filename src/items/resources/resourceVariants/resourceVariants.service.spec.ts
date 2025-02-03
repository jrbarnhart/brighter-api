import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ResourceVariant } from '@prisma/client';
import { CreateResourceVariantDto } from './dto/create-resourceVariant.dto';
import { UpdateResourceVariantDto } from './dto/update-resourceVariant.dto';
import { ResourceVariantsService } from './resourceVariants.service';

describe('ResourceVariantsService', () => {
  let service: ResourceVariantsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceVariantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ResourceVariantsService>(ResourceVariantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all resourceVariants array', async () => {
      const allResourceVariants: ResourceVariant[] = [
        {
          id: 1,
          name: 'ResourceVariant One',
          resourceId: 10,
        },
        {
          id: 2,
          name: 'ResourceVariant Two',
          resourceId: 20,
        },
      ];

      prismaMock.resourceVariant.findMany.mockResolvedValue(
        allResourceVariants,
      );

      const result = await service.findAll();
      expect(result).toEqual(allResourceVariants);
      expect(prismaMock.resourceVariant.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no resourceVariants', async () => {
      prismaMock.resourceVariant.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.resourceVariant.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the resourceVariant if it exists', async () => {
      const existingResourceVariant: ResourceVariant = {
        id: 1,
        name: 'ResourceVariant One',
        resourceId: 10,
      };

      prismaMock.resourceVariant.findUnique.mockResolvedValue(
        existingResourceVariant,
      );

      const result = await service.findOne(existingResourceVariant.id);
      expect(result).toEqual(existingResourceVariant);
      expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if resourceVariant does not exist', async () => {
      prismaMock.resourceVariant.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new resourceVariant', async () => {
      const createDto: CreateResourceVariantDto = {
        name: 'ResourceVariant One',
        resourceId: 10,
      };
      const createdResourceVariant: ResourceVariant = {
        id: 1,
        name: 'ResourceVariant One',
        resourceId: 10,
      };

      prismaMock.resourceVariant.create.mockResolvedValue(
        createdResourceVariant,
      );

      const result = await service.create(createDto);
      expect(result).toEqual(createdResourceVariant);
      expect(prismaMock.resourceVariant.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateResourceVariantDto = {
        name: 'ResourceVariant One',
        resourceId: 10,
      };

      prismaMock.resourceVariant.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.resourceVariant.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing resourceVariant', async () => {
      const existingResourceVariant: ResourceVariant = {
        id: 1,
        name: 'ResourceVariant One',
        resourceId: 10,
      };
      const updateDto: UpdateResourceVariantDto = {
        name: 'Updated ResourceVariant',
      };
      const updatedResourceVariant: ResourceVariant = {
        id: 1,
        name: 'Updated ResourceVariant',
        resourceId: 10,
      };

      prismaMock.resourceVariant.findUnique.mockResolvedValue(
        existingResourceVariant,
      );
      prismaMock.resourceVariant.update.mockResolvedValue(
        updatedResourceVariant,
      );

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedResourceVariant);
      expect(prismaMock.resourceVariant.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent resourceVariant', async () => {
      const updateDto = { name: 'Updated ResourceVariant' };

      prismaMock.resourceVariant.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.resourceVariant.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a resourceVariant', async () => {
      const resourceVariantToDelete: ResourceVariant = {
        id: 1,
        name: 'ResourceVariant One',
        resourceId: 10,
      };

      prismaMock.resourceVariant.findUnique.mockResolvedValue(
        resourceVariantToDelete,
      );
      prismaMock.resourceVariant.delete.mockResolvedValue(
        resourceVariantToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(resourceVariantToDelete);
      expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.resourceVariant.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent resourceVariant', async () => {
      prismaMock.resourceVariant.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.resourceVariant.delete).not.toHaveBeenCalled();
    });
  });
});
