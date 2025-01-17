import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { PrismaService } from 'src/prisma.service';
import { Resource } from '@prisma/client';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

describe('ResourcesService', () => {
  let service: ResourcesService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourcesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all resources array', async () => {
      const allResources: Resource[] = [
        { id: 1, name: 'Resource One', passive: false, skillId: 10 },
        { id: 2, name: 'Resource Two', passive: false, skillId: 10 },
      ];

      prismaMock.resource.findMany.mockResolvedValue(allResources);

      const result = await service.findAll();
      expect(result).toEqual(allResources);
      expect(prismaMock.resource.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no resources', async () => {
      prismaMock.resource.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.resource.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the resource if it exists', async () => {
      const existingResource: Resource = {
        id: 1,
        name: 'Resource One',
        passive: false,
        skillId: 10,
      };

      prismaMock.resource.findUnique.mockResolvedValue(existingResource);

      const result = await service.findOne(existingResource.id);
      expect(result).toEqual(existingResource);
      expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if resource does not exist', async () => {
      prismaMock.resource.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new resource', async () => {
      const createDto: CreateResourceDto = {
        name: 'Resource One',
        passive: false,
        skillId: 10,
      };
      const createdResource: Resource = {
        id: 1,
        name: 'Resource One',
        passive: false,
        skillId: 10,
      };

      prismaMock.resource.create.mockResolvedValue(createdResource);

      const result = await service.create(createDto);
      expect(result).toEqual(createdResource);
      expect(prismaMock.resource.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateResourceDto = {
        name: 'Resource One',
        passive: false,
        skillId: 10,
      };

      prismaMock.resource.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.resource.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing resource', async () => {
      const existingResource: Resource = {
        id: 1,
        name: 'Resource One',
        passive: false,
        skillId: 10,
      };
      const updateDto: UpdateResourceDto = { name: 'Updated Resource' };
      const updatedResource: Resource = {
        id: 1,
        name: 'Updated Resource',
        passive: false,
        skillId: 10,
      };

      prismaMock.resource.findUnique.mockResolvedValue(existingResource);
      prismaMock.resource.update.mockResolvedValue(updatedResource);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedResource);
      expect(prismaMock.resource.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent resource', async () => {
      const updateDto = { name: 'Updated Resource' };

      prismaMock.resource.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.resource.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a resource', async () => {
      const resourceToDelete: Resource = {
        id: 1,
        name: 'Resource One',
        passive: false,
        skillId: 10,
      };

      prismaMock.resource.findUnique.mockResolvedValue(resourceToDelete);
      prismaMock.resource.delete.mockResolvedValue(resourceToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(resourceToDelete);
      expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.resource.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent resource', async () => {
      prismaMock.resource.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.resource.delete).not.toHaveBeenCalled();
    });
  });
});
