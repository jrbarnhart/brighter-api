import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import {
  Prisma,
  PrismaClient,
  Resource,
  ResourceVariant,
} from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './dto/resource/update-resource-variant.dto';
import { CreateResourceDto } from './dto/resource/create-resource.dto';
import { UpdateResourceDto } from './dto/resource/update-resource.dto';

describe('ItemsService', () => {
  let service: ItemsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Resource Variants', () => {
    describe('getAllResourceVariants', () => {
      it('should return all resource variants array', async () => {
        const allResourceVariants: ResourceVariant[] = [
          { id: 1, name: 'small', resourceId: 10, requirementId: null },
        ];
        const findManyArgsMock: Prisma.ResourceVariantFindManyArgs = {
          include: {
            resource: true,
            requirement: true,
            dropTables: true,
            inRecipes: true,
            vendors: true,
          },
        };

        prismaMock.resourceVariant.findMany.mockResolvedValue(
          allResourceVariants,
        );

        const result = await service.findAllResourceVariants();
        expect(result).toBe(allResourceVariants);
        expect(prismaMock.resourceVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no resourceVariants', async () => {
        const findManyArgsMock: Prisma.ResourceVariantFindManyArgs = {
          include: {
            resource: true,
            requirement: true,
            dropTables: true,
            inRecipes: true,
            vendors: true,
          },
        };

        prismaMock.resourceVariant.findMany.mockResolvedValue([]);

        const result = await service.findAllResourceVariants();
        expect(result).toEqual([]);
        expect(prismaMock.resourceVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getResourceVariantById', () => {
      describe('getResourceVariantById', () => {
        it('should return the resourceVariant if it exists', async () => {
          const existingResourceVariant: ResourceVariant = {
            id: 1,
            name: 'ResourceVariant One',
            requirementId: 10,
            resourceId: 100,
          };
          const findUniqueArgsMock: Prisma.ResourceVariantFindUniqueArgs = {
            where: { id: existingResourceVariant.id },
            include: {
              resource: true,
              requirement: true,
              dropTables: true,
              inRecipes: true,
              vendors: true,
            },
          };

          prismaMock.resourceVariant.findUnique.mockResolvedValue(
            existingResourceVariant,
          );

          const result = await service.findOneResourceVariant(
            existingResourceVariant.id,
          );
          expect(result).toEqual(existingResourceVariant);
          expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(
            1,
          );
          expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledWith(
            findUniqueArgsMock,
          );
        });

        it('should throw NotFoundException if resourceVariant does not exist', async () => {
          const findUniqueArgsMock: Prisma.ResourceVariantFindUniqueArgs = {
            where: { id: 999 },
            include: {
              resource: true,
              requirement: true,
              dropTables: true,
              inRecipes: true,
              vendors: true,
            },
          };

          prismaMock.resourceVariant.findUnique.mockResolvedValue(null);

          await expect(service.findOneResourceVariant(999)).rejects.toThrow(
            NotFoundException,
          );
          expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(
            1,
          );
          expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledWith(
            findUniqueArgsMock,
          );
        });
      });
    });

    describe('createResourceVariant', () => {
      it('should create a new resourceVariant', async () => {
        const createDto: CreateResourceVariantDto = {
          name: 'ResourceVariant One',
          resourceId: 10,
        };
        const createdResourceVariant: ResourceVariant = {
          id: 1,
          name: 'ResourceVariant One',
          resourceId: 10,
          requirementId: null,
        };
        const createArgsMock: Prisma.ResourceVariantCreateArgs = {
          data: createDto,
        };

        prismaMock.resourceVariant.create.mockResolvedValue(
          createdResourceVariant,
        );

        const result = await service.createResourceVariant(createDto);
        expect(result).toEqual(createdResourceVariant);
        expect(prismaMock.resourceVariant.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.create).toHaveBeenCalledWith(
          createArgsMock,
        );
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

        await expect(service.createResourceVariant(createDto)).rejects.toThrow(
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
          requirementId: null,
        };
        const updateDto: UpdateResourceVariantDto = {
          name: 'Updated ResourceVariant',
        };
        const updatedResourceVariant: ResourceVariant = {
          id: 1,
          name: 'Updated ResourceVariant',
          resourceId: 10,
          requirementId: null,
        };
        const updateArgsMock: Prisma.ResourceVariantUpdateArgs = {
          where: { id: existingResourceVariant.id },
          data: updateDto,
        };

        prismaMock.resourceVariant.findUnique.mockResolvedValue(
          existingResourceVariant,
        );
        prismaMock.resourceVariant.update.mockResolvedValue(
          updatedResourceVariant,
        );

        const result = await service.updateResourceVariant(1, updateDto);
        expect(result).toEqual(updatedResourceVariant);
        expect(prismaMock.resourceVariant.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.update).toHaveBeenCalledWith(
          updateArgsMock,
        );
      });

      it('should throw NotFoundException when updating non-existent resourceVariant', async () => {
        const updateDto = { name: 'Updated ResourceVariant' };

        prismaMock.resourceVariant.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(
          service.updateResourceVariant(999, updateDto),
        ).rejects.toThrow(NotFoundException);
        expect(prismaMock.resourceVariant.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a resourceVariant without resourceVariants', async () => {
        const resourceVariantToDelete: ResourceVariant = {
          id: 1,
          name: 'ResourceVariant One',
          resourceId: 10,
          requirementId: null,
        };
        const deleteArgsMock: Prisma.ResourceVariantDeleteArgs = {
          where: { id: resourceVariantToDelete.id },
        };

        prismaMock.resourceVariant.findUnique.mockResolvedValue(
          resourceVariantToDelete,
        );
        prismaMock.resourceVariant.delete.mockResolvedValue(
          resourceVariantToDelete,
        );

        const result = await service.removeResourceVariant(1);
        expect(result).toEqual(resourceVariantToDelete);
        expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.delete).toHaveBeenCalledWith(
          deleteArgsMock,
        );
      });

      it('should throw NotFoundException when deleting non-existent resourceVariant', async () => {
        prismaMock.resourceVariant.findUnique.mockResolvedValue(null);

        await expect(service.removeResourceVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.resourceVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.resourceVariant.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Resources', () => {
    describe('getAllResources', () => {
      it('should return all resources array', async () => {
        const allResources: Resource[] = [
          { id: 1, name: 'Resource One', passive: false, skillId: 10 },
          { id: 2, name: 'Resource Two', passive: true, skillId: 20 },
        ];
        const findManyArgsMock: Prisma.ResourceFindManyArgs = {
          include: {
            rooms: true,
            skill: true,
            variants: true,
          },
        };

        prismaMock.resource.findMany.mockResolvedValue(allResources);

        const result = await service.findAllResources();
        expect(result).toEqual(allResources);
        expect(prismaMock.resource.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no resources', async () => {
        const findManyArgsMock: Prisma.ResourceFindManyArgs = {
          include: {
            rooms: true,
            skill: true,
            variants: true,
          },
        };

        prismaMock.resource.findMany.mockResolvedValue([]);

        const result = await service.findAllResources();
        expect(result).toEqual([]);
        expect(prismaMock.resource.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getResourceById', () => {
      it('should return the resource if it exists', async () => {
        const existingResource: Resource = {
          id: 1,
          name: 'Resource One',
          passive: false,
          skillId: 10,
        };
        const findUniqueArgsMock: Prisma.ResourceFindUniqueArgs = {
          where: { id: existingResource.id },
          include: {
            rooms: true,
            skill: true,
            variants: true,
          },
        };

        prismaMock.resource.findUnique.mockResolvedValue(existingResource);

        const result = await service.findOneResource(existingResource.id);
        expect(result).toEqual(existingResource);
        expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if resource does not exist', async () => {
        const findUniqueArgsMock: Prisma.ResourceFindUniqueArgs = {
          where: { id: 999 },
          include: {
            rooms: true,
            skill: true,
            variants: true,
          },
        };

        prismaMock.resource.findUnique.mockResolvedValue(null);

        await expect(service.findOneResource(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
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
        const createArgsMock: Prisma.ResourceCreateArgs = { data: createDto };

        prismaMock.resource.create.mockResolvedValue(createdResource);

        const result = await service.createResource(createDto);
        expect(result).toEqual(createdResource);
        expect(prismaMock.resource.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.create).toHaveBeenCalledWith(createArgsMock);
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

        await expect(service.createResource(createDto)).rejects.toThrow(
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
        const updateArgsMock: Prisma.ResourceUpdateArgs = {
          where: { id: existingResource.id },
          data: updateDto,
        };

        prismaMock.resource.findUnique.mockResolvedValue(existingResource);
        prismaMock.resource.update.mockResolvedValue(updatedResource);

        const result = await service.updateResource(1, updateDto);
        expect(result).toEqual(updatedResource);
        expect(prismaMock.resource.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.update).toHaveBeenCalledWith(updateArgsMock);
      });

      it('should throw NotFoundException when updating non-existent resource', async () => {
        const updateDto = { name: 'Updated Resource' };

        prismaMock.resource.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(service.updateResource(999, updateDto)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.resource.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a resource without resources', async () => {
        const resourceToDelete: Resource = {
          id: 1,
          name: 'Resource One',
          passive: false,
          skillId: 10,
        };
        const deleteArgsMock: Prisma.ResourceDeleteArgs = {
          where: { id: resourceToDelete.id },
        };

        prismaMock.resource.findUnique.mockResolvedValue(resourceToDelete);
        prismaMock.resource.delete.mockResolvedValue(resourceToDelete);

        const result = await service.removeResource(1);
        expect(result).toEqual(resourceToDelete);
        expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.delete).toHaveBeenCalledWith(deleteArgsMock);
      });

      it('should throw NotFoundException when deleting non-existent resource', async () => {
        prismaMock.resource.findUnique.mockResolvedValue(null);

        await expect(service.removeResource(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.resource.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.resource.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Consumable Variants', () => {});

  describe('Consumables', () => {});

  describe('Weapon Variants', () => {});

  describe('Weapons', () => {});

  describe('Armor Variants', () => {});

  describe('Armor', () => {});

  describe('Misc Items', () => {});
});
