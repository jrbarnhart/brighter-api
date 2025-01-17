import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import {
  Armor,
  ArmorVariant,
  Consumable,
  ConsumableVariant,
  MiscItem,
  Prisma,
  PrismaClient,
  Resource,
  ResourceVariant,
  Weapon,
  WeaponVariant,
} from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateResourceVariantDto } from './resourceVariants/dto/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './resourceVariants/dto/update-resource-variant.dto';
import { CreateResourceDto } from './resources/dto/create-resource.dto';
import { UpdateResourceDto } from './resources/dto/update-resource.dto';
import { CreateConsumableVariantDto } from './dto/consumable/create-consumable-variant.dto';
import { UpdateConsumableVariantDto } from './dto/consumable/update-consumable-variant.dto';
import { CreateConsumableDto } from './dto/consumable/create-consumable.dto';
import { UpdateConsumableDto } from './dto/consumable/update-consumable.dto';
import { CreateWeaponVariantDto } from './dto/weapon/create-weapon-variant.dto';
import { UpdateWeaponVariantDto } from './dto/weapon/update-weapon-variant.dto';
import { CreateWeaponDto } from './dto/weapon/create-weapon.dto';
import { UpdateWeaponDto } from './dto/weapon/update-weapon.dto';
import { CreateArmorVariantDto } from './dto/armor/create-armor-variant.dto';
import { UpdateArmorVariantDto } from './dto/armor/update-armor-variant.dto';
import { CreateArmorDto } from './dto/armor/create-armor.dto';
import { UpdateArmorDto } from './dto/armor/update-armor.dto';
import { CreateMiscItemDto } from './dto/miscItem/create-misc-item.dto';
import { UpdateMiscItemDto } from './dto/miscItem/update-misc-item.dto';

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

  describe('Consumable Variants', () => {
    describe('getAllConsumableVariants', () => {
      it('should return all consumableVariants array', async () => {
        const allConsumableVariants: ConsumableVariant[] = [
          {
            id: 1,
            name: 'ConsumableVariant One',
            consumableId: 10,
            recipeId: null,
          },
          {
            id: 2,
            name: 'ConsumableVariant Two',
            consumableId: 20,
            recipeId: null,
          },
        ];
        const findManyArgsMock: Prisma.ConsumableVariantFindManyArgs = {
          include: {
            consumable: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.consumableVariant.findMany.mockResolvedValue(
          allConsumableVariants,
        );

        const result = await service.findAllConsumableVariants();
        expect(result).toEqual(allConsumableVariants);
        expect(prismaMock.consumableVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumableVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no consumableVariants', async () => {
        const findManyArgsMock: Prisma.ConsumableVariantFindManyArgs = {
          include: {
            consumable: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.consumableVariant.findMany.mockResolvedValue([]);

        const result = await service.findAllConsumableVariants();
        expect(result).toEqual([]);
        expect(prismaMock.consumableVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumableVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getConsumableVariantById', () => {
      it('should return the consumableVariant if it exists', async () => {
        const existingConsumableVariant: ConsumableVariant = {
          id: 1,
          name: 'ConsumableVariant One',
          consumableId: 10,
          recipeId: null,
        };
        const findUniqueArgsMock: Prisma.ConsumableVariantFindUniqueArgs = {
          where: { id: existingConsumableVariant.id },
          include: {
            consumable: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.consumableVariant.findUnique.mockResolvedValue(
          existingConsumableVariant,
        );

        const result = await service.findOneConsumableVariant(
          existingConsumableVariant.id,
        );
        expect(result).toEqual(existingConsumableVariant);
        expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(
          1,
        );
        expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if consumableVariant does not exist', async () => {
        const findUniqueArgsMock: Prisma.ConsumableVariantFindUniqueArgs = {
          where: { id: 999 },
          include: {
            consumable: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.consumableVariant.findUnique.mockResolvedValue(null);

        await expect(service.findOneConsumableVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(
          1,
        );
        expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new consumableVariant', async () => {
        const createDto: CreateConsumableVariantDto = {
          name: 'ConsumableVariant One',
          consumableId: 10,
        };
        const createdConsumableVariant: ConsumableVariant = {
          id: 1,
          name: 'ConsumableVariant One',
          consumableId: 10,
          recipeId: null,
        };
        const createArgsMock: Prisma.ConsumableVariantCreateArgs = {
          data: createDto,
        };

        prismaMock.consumableVariant.create.mockResolvedValue(
          createdConsumableVariant,
        );

        const result = await service.createConsumableVariant(createDto);
        expect(result).toEqual(createdConsumableVariant);
        expect(prismaMock.consumableVariant.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumableVariant.create).toHaveBeenCalledWith(
          createArgsMock,
        );
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateConsumableVariantDto = {
          name: 'ConsumableVariant One',
          consumableId: 10,
        };

        prismaMock.consumableVariant.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(
          service.createConsumableVariant(createDto),
        ).rejects.toThrow(BadRequestException);
        expect(prismaMock.consumableVariant.create).toHaveBeenCalledTimes(1);
      });
    });

    describe('update', () => {
      it('should update an existing consumableVariant', async () => {
        const existingConsumableVariant: ConsumableVariant = {
          id: 1,
          name: 'ConsumableVariant One',
          consumableId: 10,
          recipeId: null,
        };
        const updateDto: UpdateConsumableVariantDto = {
          name: 'Updated ConsumableVariant',
        };
        const updatedConsumableVariant: ConsumableVariant = {
          id: 1,
          name: 'Updated ConsumableVariant',
          consumableId: 10,
          recipeId: null,
        };
        const updateArgsMock: Prisma.ConsumableVariantUpdateArgs = {
          where: { id: existingConsumableVariant.id },
          data: updateDto,
        };

        prismaMock.consumableVariant.findUnique.mockResolvedValue(
          existingConsumableVariant,
        );
        prismaMock.consumableVariant.update.mockResolvedValue(
          updatedConsumableVariant,
        );

        const result = await service.updateConsumableVariant(1, updateDto);
        expect(result).toEqual(updatedConsumableVariant);
        expect(prismaMock.consumableVariant.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumableVariant.update).toHaveBeenCalledWith(
          updateArgsMock,
        );
      });

      it('should throw NotFoundException when updating non-existent consumableVariant', async () => {
        const updateDto = { name: 'Updated ConsumableVariant' };

        prismaMock.consumableVariant.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(
          service.updateConsumableVariant(999, updateDto),
        ).rejects.toThrow(NotFoundException);
        expect(prismaMock.consumableVariant.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a consumableVariant without consumableVariants', async () => {
        const consumableVariantToDelete: ConsumableVariant = {
          id: 1,
          name: 'ConsumableVariant One',
          consumableId: 10,
          recipeId: null,
        };
        const deleteArgsMock: Prisma.ConsumableVariantDeleteArgs = {
          where: { id: consumableVariantToDelete.id },
        };

        prismaMock.consumableVariant.findUnique.mockResolvedValue(
          consumableVariantToDelete,
        );
        prismaMock.consumableVariant.delete.mockResolvedValue(
          consumableVariantToDelete,
        );

        const result = await service.removeConsumableVariant(1);
        expect(result).toEqual(consumableVariantToDelete);
        expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(
          1,
        );
        expect(prismaMock.consumableVariant.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumableVariant.delete).toHaveBeenCalledWith(
          deleteArgsMock,
        );
      });

      it('should throw NotFoundException when deleting non-existent consumableVariant', async () => {
        prismaMock.consumableVariant.findUnique.mockResolvedValue(null);

        await expect(service.removeConsumableVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.consumableVariant.findUnique).toHaveBeenCalledTimes(
          1,
        );
        expect(prismaMock.consumableVariant.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Consumables', () => {
    describe('getAllConsumables', () => {
      it('should return all consumables array', async () => {
        const allConsumables: Consumable[] = [
          { id: 1, name: 'Consumable One' },
          { id: 2, name: 'Consumable Two' },
        ];
        const findManyArgsMock: Prisma.ConsumableFindManyArgs = {
          include: {
            variants: true,
          },
        };

        prismaMock.consumable.findMany.mockResolvedValue(allConsumables);

        const result = await service.findAllConsumables();
        expect(result).toEqual(allConsumables);
        expect(prismaMock.consumable.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no consumables', async () => {
        const findManyArgsMock: Prisma.ConsumableFindManyArgs = {
          include: {
            variants: true,
          },
        };

        prismaMock.consumable.findMany.mockResolvedValue([]);

        const result = await service.findAllConsumables();
        expect(result).toEqual([]);
        expect(prismaMock.consumable.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getConsumableById', () => {
      it('should return the consumable if it exists', async () => {
        const existingConsumable: Consumable = {
          id: 1,
          name: 'Consumable One',
        };
        const findUniqueArgsMock: Prisma.ConsumableFindUniqueArgs = {
          where: { id: existingConsumable.id },
          include: {
            variants: true,
          },
        };

        prismaMock.consumable.findUnique.mockResolvedValue(existingConsumable);

        const result = await service.findOneConsumable(existingConsumable.id);
        expect(result).toEqual(existingConsumable);
        expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if consumable does not exist', async () => {
        const findUniqueArgsMock: Prisma.ConsumableFindUniqueArgs = {
          where: { id: 999 },
          include: {
            variants: true,
          },
        };

        prismaMock.consumable.findUnique.mockResolvedValue(null);

        await expect(service.findOneConsumable(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new consumable', async () => {
        const createDto: CreateConsumableDto = {
          name: 'Consumable One',
        };
        const createdConsumable: Consumable = {
          id: 1,
          name: 'Consumable One',
        };
        const createArgsMock: Prisma.ConsumableCreateArgs = { data: createDto };

        prismaMock.consumable.create.mockResolvedValue(createdConsumable);

        const result = await service.createConsumable(createDto);
        expect(result).toEqual(createdConsumable);
        expect(prismaMock.consumable.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.create).toHaveBeenCalledWith(
          createArgsMock,
        );
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateConsumableDto = {
          name: 'Consumable One',
        };

        prismaMock.consumable.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(service.createConsumable(createDto)).rejects.toThrow(
          BadRequestException,
        );
        expect(prismaMock.consumable.create).toHaveBeenCalledTimes(1);
      });
    });

    describe('update', () => {
      it('should update an existing consumable', async () => {
        const existingConsumable: Consumable = {
          id: 1,
          name: 'Consumable One',
        };
        const updateDto: UpdateConsumableDto = { name: 'Updated Consumable' };
        const updatedConsumable: Consumable = {
          id: 1,
          name: 'Updated Consumable',
        };
        const updateArgsMock: Prisma.ConsumableUpdateArgs = {
          where: { id: existingConsumable.id },
          data: updateDto,
        };

        prismaMock.consumable.findUnique.mockResolvedValue(existingConsumable);
        prismaMock.consumable.update.mockResolvedValue(updatedConsumable);

        const result = await service.updateConsumable(1, updateDto);
        expect(result).toEqual(updatedConsumable);
        expect(prismaMock.consumable.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.update).toHaveBeenCalledWith(
          updateArgsMock,
        );
      });

      it('should throw NotFoundException when updating non-existent consumable', async () => {
        const updateDto = { name: 'Updated Consumable' };

        prismaMock.consumable.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(service.updateConsumable(999, updateDto)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.consumable.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a consumable without consumables', async () => {
        const consumableToDelete: Consumable = {
          id: 1,
          name: 'Consumable One',
        };
        const deleteArgsMock: Prisma.ConsumableDeleteArgs = {
          where: { id: consumableToDelete.id },
        };

        prismaMock.consumable.findUnique.mockResolvedValue(consumableToDelete);
        prismaMock.consumable.delete.mockResolvedValue(consumableToDelete);

        const result = await service.removeConsumable(1);
        expect(result).toEqual(consumableToDelete);
        expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.delete).toHaveBeenCalledWith(
          deleteArgsMock,
        );
      });

      it('should throw NotFoundException when deleting non-existent consumable', async () => {
        prismaMock.consumable.findUnique.mockResolvedValue(null);

        await expect(service.removeConsumable(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.consumable.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.consumable.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Weapon Variants', () => {
    describe('getAllWeaponVariants', () => {
      it('should return all weaponVariants array', async () => {
        const allWeaponVariants: WeaponVariant[] = [
          { id: 1, name: 'WeaponVariant One', weaponId: 10, recipeId: null },
          { id: 2, name: 'WeaponVariant Two', weaponId: 20, recipeId: null },
        ];
        const findManyArgsMock: Prisma.WeaponVariantFindManyArgs = {
          include: {
            dropTables: true,
            recipe: true,
            vendors: true,
            weapon: true,
          },
        };

        prismaMock.weaponVariant.findMany.mockResolvedValue(allWeaponVariants);

        const result = await service.findAllWeaponVariants();
        expect(result).toEqual(allWeaponVariants);
        expect(prismaMock.weaponVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no weaponVariants', async () => {
        const findManyArgsMock: Prisma.WeaponVariantFindManyArgs = {
          include: {
            dropTables: true,
            recipe: true,
            vendors: true,
            weapon: true,
          },
        };

        prismaMock.weaponVariant.findMany.mockResolvedValue([]);

        const result = await service.findAllWeaponVariants();
        expect(result).toEqual([]);
        expect(prismaMock.weaponVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getWeaponVariantById', () => {
      it('should return the weaponVariant if it exists', async () => {
        const existingWeaponVariant: WeaponVariant = {
          id: 1,
          name: 'WeaponVariant One',
          weaponId: 10,
          recipeId: null,
        };
        const findUniqueArgsMock: Prisma.WeaponVariantFindUniqueArgs = {
          where: { id: existingWeaponVariant.id },
          include: {
            dropTables: true,
            recipe: true,
            vendors: true,
            weapon: true,
          },
        };

        prismaMock.weaponVariant.findUnique.mockResolvedValue(
          existingWeaponVariant,
        );

        const result = await service.findOneWeaponVariant(
          existingWeaponVariant.id,
        );
        expect(result).toEqual(existingWeaponVariant);
        expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if weaponVariant does not exist', async () => {
        const findUniqueArgsMock: Prisma.WeaponVariantFindUniqueArgs = {
          where: { id: 999 },
          include: {
            dropTables: true,
            recipe: true,
            vendors: true,
            weapon: true,
          },
        };

        prismaMock.weaponVariant.findUnique.mockResolvedValue(null);

        await expect(service.findOneWeaponVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new weaponVariant', async () => {
        const createDto: CreateWeaponVariantDto = {
          name: 'WeaponVariant One',
          weaponId: 10,
        };
        const createdWeaponVariant: WeaponVariant = {
          id: 1,
          name: 'WeaponVariant One',
          weaponId: 10,
          recipeId: null,
        };
        const createArgsMock: Prisma.WeaponVariantCreateArgs = {
          data: createDto,
        };

        prismaMock.weaponVariant.create.mockResolvedValue(createdWeaponVariant);

        const result = await service.createWeaponVariant(createDto);
        expect(result).toEqual(createdWeaponVariant);
        expect(prismaMock.weaponVariant.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.create).toHaveBeenCalledWith(
          createArgsMock,
        );
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateWeaponVariantDto = {
          name: 'WeaponVariant One',
          weaponId: 10,
        };

        prismaMock.weaponVariant.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(service.createWeaponVariant(createDto)).rejects.toThrow(
          BadRequestException,
        );
        expect(prismaMock.weaponVariant.create).toHaveBeenCalledTimes(1);
      });
    });

    describe('update', () => {
      it('should update an existing weaponVariant', async () => {
        const existingWeaponVariant: WeaponVariant = {
          id: 1,
          name: 'WeaponVariant One',
          weaponId: 10,
          recipeId: null,
        };
        const updateDto: UpdateWeaponVariantDto = {
          name: 'Updated WeaponVariant',
        };
        const updatedWeaponVariant: WeaponVariant = {
          id: 1,
          name: 'Updated WeaponVariant',
          weaponId: 10,
          recipeId: null,
        };
        const updateArgsMock: Prisma.WeaponVariantUpdateArgs = {
          where: { id: existingWeaponVariant.id },
          data: updateDto,
        };

        prismaMock.weaponVariant.findUnique.mockResolvedValue(
          existingWeaponVariant,
        );
        prismaMock.weaponVariant.update.mockResolvedValue(updatedWeaponVariant);

        const result = await service.updateWeaponVariant(1, updateDto);
        expect(result).toEqual(updatedWeaponVariant);
        expect(prismaMock.weaponVariant.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.update).toHaveBeenCalledWith(
          updateArgsMock,
        );
      });

      it('should throw NotFoundException when updating non-existent weaponVariant', async () => {
        const updateDto = { name: 'Updated WeaponVariant' };

        prismaMock.weaponVariant.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(
          service.updateWeaponVariant(999, updateDto),
        ).rejects.toThrow(NotFoundException);
        expect(prismaMock.weaponVariant.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a weaponVariant without weaponVariants', async () => {
        const weaponVariantToDelete: WeaponVariant = {
          id: 1,
          name: 'WeaponVariant One',
          weaponId: 10,
          recipeId: null,
        };
        const deleteArgsMock: Prisma.WeaponVariantDeleteArgs = {
          where: { id: weaponVariantToDelete.id },
        };

        prismaMock.weaponVariant.findUnique.mockResolvedValue(
          weaponVariantToDelete,
        );
        prismaMock.weaponVariant.delete.mockResolvedValue(
          weaponVariantToDelete,
        );

        const result = await service.removeWeaponVariant(1);
        expect(result).toEqual(weaponVariantToDelete);
        expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.delete).toHaveBeenCalledWith(
          deleteArgsMock,
        );
      });

      it('should throw NotFoundException when deleting non-existent weaponVariant', async () => {
        prismaMock.weaponVariant.findUnique.mockResolvedValue(null);

        await expect(service.removeWeaponVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.weaponVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weaponVariant.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Weapons', () => {
    describe('getAllWeapons', () => {
      it('should return all weapons array', async () => {
        const allWeapons: Weapon[] = [
          {
            id: 1,
            name: 'Weapon One',
            element: 'IMPACT',
            faction: 'NONE',
            isRanged: false,
            isTwoHanded: true,
          },
          {
            id: 2,
            name: 'Weapon Two',
            element: 'IMPACT',
            faction: 'NONE',
            isRanged: false,
            isTwoHanded: true,
          },
        ];
        const findManyArgsMock: Prisma.WeaponFindManyArgs = {
          include: {
            variants: true,
          },
        };

        prismaMock.weapon.findMany.mockResolvedValue(allWeapons);

        const result = await service.findAllWeapons();
        expect(result).toEqual(allWeapons);
        expect(prismaMock.weapon.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no weapons', async () => {
        const findManyArgsMock: Prisma.WeaponFindManyArgs = {
          include: {
            variants: true,
          },
        };

        prismaMock.weapon.findMany.mockResolvedValue([]);

        const result = await service.findAllWeapons();
        expect(result).toEqual([]);
        expect(prismaMock.weapon.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getWeaponById', () => {
      it('should return the weapon if it exists', async () => {
        const existingWeapon: Weapon = {
          id: 1,
          name: 'Weapon One',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };
        const findUniqueArgsMock: Prisma.WeaponFindUniqueArgs = {
          where: { id: existingWeapon.id },
          include: {
            variants: true,
          },
        };

        prismaMock.weapon.findUnique.mockResolvedValue(existingWeapon);

        const result = await service.findOneWeapon(existingWeapon.id);
        expect(result).toEqual(existingWeapon);
        expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if weapon does not exist', async () => {
        const findUniqueArgsMock: Prisma.WeaponFindUniqueArgs = {
          where: { id: 999 },
          include: {
            variants: true,
          },
        };

        prismaMock.weapon.findUnique.mockResolvedValue(null);

        await expect(service.findOneWeapon(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new weapon', async () => {
        const createDto: CreateWeaponDto = {
          name: 'Weapon One',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };
        const createdWeapon: Weapon = {
          id: 1,
          name: 'Weapon One',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };
        const createArgsMock: Prisma.WeaponCreateArgs = { data: createDto };

        prismaMock.weapon.create.mockResolvedValue(createdWeapon);

        const result = await service.createWeapon(createDto);
        expect(result).toEqual(createdWeapon);
        expect(prismaMock.weapon.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.create).toHaveBeenCalledWith(createArgsMock);
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateWeaponDto = {
          name: 'Weapon One',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };

        prismaMock.weapon.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(service.createWeapon(createDto)).rejects.toThrow(
          BadRequestException,
        );
        expect(prismaMock.weapon.create).toHaveBeenCalledTimes(1);
      });
    });

    describe('update', () => {
      it('should update an existing weapon', async () => {
        const existingWeapon: Weapon = {
          id: 1,
          name: 'Weapon One',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };
        const updateDto: UpdateWeaponDto = { name: 'Updated Weapon' };
        const updatedWeapon: Weapon = {
          id: 1,
          name: 'Updated Weapon',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };
        const updateArgsMock: Prisma.WeaponUpdateArgs = {
          where: { id: existingWeapon.id },
          data: updateDto,
        };

        prismaMock.weapon.findUnique.mockResolvedValue(existingWeapon);
        prismaMock.weapon.update.mockResolvedValue(updatedWeapon);

        const result = await service.updateWeapon(1, updateDto);
        expect(result).toEqual(updatedWeapon);
        expect(prismaMock.weapon.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.update).toHaveBeenCalledWith(updateArgsMock);
      });

      it('should throw NotFoundException when updating non-existent weapon', async () => {
        const updateDto = { name: 'Updated Weapon' };

        prismaMock.weapon.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(service.updateWeapon(999, updateDto)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.weapon.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a weapon without weapons', async () => {
        const weaponToDelete: Weapon = {
          id: 1,
          name: 'Weapon One',
          element: 'IMPACT',
          faction: 'NONE',
          isRanged: false,
          isTwoHanded: true,
        };
        const deleteArgsMock: Prisma.WeaponDeleteArgs = {
          where: { id: weaponToDelete.id },
        };

        prismaMock.weapon.findUnique.mockResolvedValue(weaponToDelete);
        prismaMock.weapon.delete.mockResolvedValue(weaponToDelete);

        const result = await service.removeWeapon(1);
        expect(result).toEqual(weaponToDelete);
        expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.delete).toHaveBeenCalledWith(deleteArgsMock);
      });

      it('should throw NotFoundException when deleting non-existent weapon', async () => {
        prismaMock.weapon.findUnique.mockResolvedValue(null);

        await expect(service.removeWeapon(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.weapon.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Armor Variants', () => {
    describe('getAllArmorVariants', () => {
      it('should return all armorVariants array', async () => {
        const allArmorVariants: ArmorVariant[] = [
          { id: 1, name: 'ArmorVariant One', armorId: 10, recipeId: null },
          { id: 2, name: 'ArmorVariant Two', armorId: 20, recipeId: null },
        ];
        const findManyArgsMock: Prisma.ArmorVariantFindManyArgs = {
          include: {
            armor: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.armorVariant.findMany.mockResolvedValue(allArmorVariants);

        const result = await service.findAllArmorVariants();
        expect(result).toEqual(allArmorVariants);
        expect(prismaMock.armorVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no armorVariants', async () => {
        const findManyArgsMock: Prisma.ArmorVariantFindManyArgs = {
          include: {
            armor: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.armorVariant.findMany.mockResolvedValue([]);

        const result = await service.findAllArmorVariants();
        expect(result).toEqual([]);
        expect(prismaMock.armorVariant.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getArmorVariantById', () => {
      it('should return the armorVariant if it exists', async () => {
        const existingArmorVariant: ArmorVariant = {
          id: 1,
          name: 'ArmorVariant One',
          armorId: 10,
          recipeId: null,
        };
        const findUniqueArgsMock: Prisma.ArmorVariantFindUniqueArgs = {
          where: { id: existingArmorVariant.id },
          include: {
            armor: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.armorVariant.findUnique.mockResolvedValue(
          existingArmorVariant,
        );

        const result = await service.findOneArmorVariant(
          existingArmorVariant.id,
        );
        expect(result).toEqual(existingArmorVariant);
        expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if armorVariant does not exist', async () => {
        const findUniqueArgsMock: Prisma.ArmorVariantFindUniqueArgs = {
          where: { id: 999 },
          include: {
            armor: true,
            dropTables: true,
            recipe: true,
            vendors: true,
          },
        };

        prismaMock.armorVariant.findUnique.mockResolvedValue(null);

        await expect(service.findOneArmorVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new armorVariant', async () => {
        const createDto: CreateArmorVariantDto = {
          name: 'ArmorVariant One',
          armorId: 10,
        };
        const createdArmorVariant: ArmorVariant = {
          id: 1,
          name: 'ArmorVariant One',
          armorId: 10,
          recipeId: null,
        };
        const createArgsMock: Prisma.ArmorVariantCreateArgs = {
          data: createDto,
        };

        prismaMock.armorVariant.create.mockResolvedValue(createdArmorVariant);

        const result = await service.createArmorVariant(createDto);
        expect(result).toEqual(createdArmorVariant);
        expect(prismaMock.armorVariant.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.create).toHaveBeenCalledWith(
          createArgsMock,
        );
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateArmorVariantDto = {
          name: 'ArmorVariant One',
          armorId: 10,
        };

        prismaMock.armorVariant.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(service.createArmorVariant(createDto)).rejects.toThrow(
          BadRequestException,
        );
        expect(prismaMock.armorVariant.create).toHaveBeenCalledTimes(1);
      });
    });

    describe('update', () => {
      it('should update an existing armorVariant', async () => {
        const existingArmorVariant: ArmorVariant = {
          id: 1,
          name: 'ArmorVariant One',
          armorId: 10,
          recipeId: null,
        };
        const updateDto: UpdateArmorVariantDto = {
          name: 'Updated ArmorVariant',
        };
        const updatedArmorVariant: ArmorVariant = {
          id: 1,
          name: 'Updated ArmorVariant',
          armorId: 10,
          recipeId: null,
        };
        const updateArgsMock: Prisma.ArmorVariantUpdateArgs = {
          where: { id: existingArmorVariant.id },
          data: updateDto,
        };

        prismaMock.armorVariant.findUnique.mockResolvedValue(
          existingArmorVariant,
        );
        prismaMock.armorVariant.update.mockResolvedValue(updatedArmorVariant);

        const result = await service.updateArmorVariant(1, updateDto);
        expect(result).toEqual(updatedArmorVariant);
        expect(prismaMock.armorVariant.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.update).toHaveBeenCalledWith(
          updateArgsMock,
        );
      });

      it('should throw NotFoundException when updating non-existent armorVariant', async () => {
        const updateDto = { name: 'Updated ArmorVariant' };

        prismaMock.armorVariant.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(
          service.updateArmorVariant(999, updateDto),
        ).rejects.toThrow(NotFoundException);
        expect(prismaMock.armorVariant.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a armorVariant without armorVariants', async () => {
        const armorVariantToDelete: ArmorVariant = {
          id: 1,
          name: 'ArmorVariant One',
          armorId: 10,
          recipeId: null,
        };
        const deleteArgsMock: Prisma.ArmorVariantDeleteArgs = {
          where: { id: armorVariantToDelete.id },
        };

        prismaMock.armorVariant.findUnique.mockResolvedValue(
          armorVariantToDelete,
        );
        prismaMock.armorVariant.delete.mockResolvedValue(armorVariantToDelete);

        const result = await service.removeArmorVariant(1);
        expect(result).toEqual(armorVariantToDelete);
        expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.delete).toHaveBeenCalledWith(
          deleteArgsMock,
        );
      });

      it('should throw NotFoundException when deleting non-existent armorVariant', async () => {
        prismaMock.armorVariant.findUnique.mockResolvedValue(null);

        await expect(service.removeArmorVariant(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.armorVariant.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armorVariant.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Armor', () => {
    describe('getAllArmors', () => {
      it('should return all armors array', async () => {
        const allArmors: Armor[] = [
          { id: 1, name: 'Armor One', faction: 'CRYOKNIGHT', slot: 'SHIELD' },
          { id: 2, name: 'Armor Two', faction: 'HAMMERMAGE', slot: 'TORSO' },
        ];
        const findManyArgsMock: Prisma.ArmorFindManyArgs = {
          include: {
            variants: true,
          },
        };

        prismaMock.armor.findMany.mockResolvedValue(allArmors);

        const result = await service.findAllArmor();
        expect(result).toEqual(allArmors);
        expect(prismaMock.armor.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no armors', async () => {
        const findManyArgsMock: Prisma.ArmorFindManyArgs = {
          include: {
            variants: true,
          },
        };

        prismaMock.armor.findMany.mockResolvedValue([]);

        const result = await service.findAllArmor();
        expect(result).toEqual([]);
        expect(prismaMock.armor.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getArmorById', () => {
      it('should return the armor if it exists', async () => {
        const existingArmor: Armor = {
          id: 1,
          name: 'Armor One',
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };
        const findUniqueArgsMock: Prisma.ArmorFindUniqueArgs = {
          where: { id: existingArmor.id },
          include: {
            variants: true,
          },
        };

        prismaMock.armor.findUnique.mockResolvedValue(existingArmor);

        const result = await service.findOneArmor(existingArmor.id);
        expect(result).toEqual(existingArmor);
        expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if armor does not exist', async () => {
        const findUniqueArgsMock: Prisma.ArmorFindUniqueArgs = {
          where: { id: 999 },
          include: {
            variants: true,
          },
        };

        prismaMock.armor.findUnique.mockResolvedValue(null);

        await expect(service.findOneArmor(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new armor', async () => {
        const createDto: CreateArmorDto = {
          name: 'Armor One',
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };
        const createdArmor: Armor = {
          id: 1,
          name: 'Armor One',
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };
        const createArgsMock: Prisma.ArmorCreateArgs = { data: createDto };

        prismaMock.armor.create.mockResolvedValue(createdArmor);

        const result = await service.createArmor(createDto);
        expect(result).toEqual(createdArmor);
        expect(prismaMock.armor.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.create).toHaveBeenCalledWith(createArgsMock);
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateArmorDto = {
          name: 'Armor One',
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };

        prismaMock.armor.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(service.createArmor(createDto)).rejects.toThrow(
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
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };
        const updateDto: UpdateArmorDto = { name: 'Updated Armor' };
        const updatedArmor: Armor = {
          id: 1,
          name: 'Updated Armor',
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };
        const updateArgsMock: Prisma.ArmorUpdateArgs = {
          where: { id: existingArmor.id },
          data: updateDto,
        };

        prismaMock.armor.findUnique.mockResolvedValue(existingArmor);
        prismaMock.armor.update.mockResolvedValue(updatedArmor);

        const result = await service.updateArmor(1, updateDto);
        expect(result).toEqual(updatedArmor);
        expect(prismaMock.armor.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.update).toHaveBeenCalledWith(updateArgsMock);
      });

      it('should throw NotFoundException when updating non-existent armor', async () => {
        const updateDto = { name: 'Updated Armor' };

        prismaMock.armor.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(service.updateArmor(999, updateDto)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.armor.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a armor without armors', async () => {
        const armorToDelete: Armor = {
          id: 1,
          name: 'Armor One',
          faction: 'CRYOKNIGHT',
          slot: 'SHIELD',
        };
        const deleteArgsMock: Prisma.ArmorDeleteArgs = {
          where: { id: armorToDelete.id },
        };

        prismaMock.armor.findUnique.mockResolvedValue(armorToDelete);
        prismaMock.armor.delete.mockResolvedValue(armorToDelete);

        const result = await service.removeArmor(1);
        expect(result).toEqual(armorToDelete);
        expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.delete).toHaveBeenCalledWith(deleteArgsMock);
      });

      it('should throw NotFoundException when deleting non-existent armor', async () => {
        prismaMock.armor.findUnique.mockResolvedValue(null);

        await expect(service.removeArmor(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.armor.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.armor.delete).not.toHaveBeenCalled();
      });
    });
  });

  describe('Misc Items', () => {
    describe('getAllMiscItems', () => {
      it('should return all miscItems array', async () => {
        const allMiscItems: MiscItem[] = [
          { id: 1, name: 'MiscItem One' },
          { id: 2, name: 'MiscItem Two' },
        ];
        const findManyArgsMock: Prisma.MiscItemFindManyArgs = {
          include: {
            inRecipes: true,
            vendors: true,
          },
        };

        prismaMock.miscItem.findMany.mockResolvedValue(allMiscItems);

        const result = await service.findAllMiscItem();
        expect(result).toEqual(allMiscItems);
        expect(prismaMock.miscItem.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });

      it('should return empty array if there are no miscItems', async () => {
        const findManyArgsMock: Prisma.MiscItemFindManyArgs = {
          include: {
            inRecipes: true,
            vendors: true,
          },
        };

        prismaMock.miscItem.findMany.mockResolvedValue([]);

        const result = await service.findAllMiscItem();
        expect(result).toEqual([]);
        expect(prismaMock.miscItem.findMany).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.findMany).toHaveBeenCalledWith(
          findManyArgsMock,
        );
      });
    });

    describe('getMiscItemById', () => {
      it('should return the miscItem if it exists', async () => {
        const existingMiscItem: MiscItem = {
          id: 1,
          name: 'MiscItem One',
        };
        const findUniqueArgsMock: Prisma.MiscItemFindUniqueArgs = {
          where: { id: existingMiscItem.id },
          include: {
            inRecipes: true,
            vendors: true,
          },
        };

        prismaMock.miscItem.findUnique.mockResolvedValue(existingMiscItem);

        const result = await service.findOneMiscItem(existingMiscItem.id);
        expect(result).toEqual(existingMiscItem);
        expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });

      it('should throw NotFoundException if miscItem does not exist', async () => {
        const findUniqueArgsMock: Prisma.MiscItemFindUniqueArgs = {
          where: { id: 999 },
          include: {
            inRecipes: true,
            vendors: true,
          },
        };

        prismaMock.miscItem.findUnique.mockResolvedValue(null);

        await expect(service.findOneMiscItem(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.findUnique).toHaveBeenCalledWith(
          findUniqueArgsMock,
        );
      });
    });

    describe('create', () => {
      it('should create a new miscItem', async () => {
        const createDto: CreateMiscItemDto = {
          name: 'MiscItem One',
        };
        const createdMiscItem: MiscItem = {
          id: 1,
          name: 'MiscItem One',
        };
        const createArgsMock: Prisma.MiscItemCreateArgs = { data: createDto };

        prismaMock.miscItem.create.mockResolvedValue(createdMiscItem);

        const result = await service.createMiscItem(createDto);
        expect(result).toEqual(createdMiscItem);
        expect(prismaMock.miscItem.create).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.create).toHaveBeenCalledWith(createArgsMock);
      });

      it('should throw BadRequestException on duplicate name', async () => {
        const createDto: CreateMiscItemDto = {
          name: 'MiscItem One',
        };

        prismaMock.miscItem.create.mockRejectedValue({
          code: 'P2002',
          clientVersion: '4.7.1',
        });

        await expect(service.createMiscItem(createDto)).rejects.toThrow(
          BadRequestException,
        );
        expect(prismaMock.miscItem.create).toHaveBeenCalledTimes(1);
      });
    });

    describe('update', () => {
      it('should update an existing miscItem', async () => {
        const existingMiscItem: MiscItem = {
          id: 1,
          name: 'MiscItem One',
        };
        const updateDto: UpdateMiscItemDto = { name: 'Updated MiscItem' };
        const updatedMiscItem: MiscItem = {
          id: 1,
          name: 'Updated MiscItem',
        };
        const updateArgsMock: Prisma.MiscItemUpdateArgs = {
          where: { id: existingMiscItem.id },
          data: updateDto,
        };

        prismaMock.miscItem.findUnique.mockResolvedValue(existingMiscItem);
        prismaMock.miscItem.update.mockResolvedValue(updatedMiscItem);

        const result = await service.updateMiscItem(1, updateDto);
        expect(result).toEqual(updatedMiscItem);
        expect(prismaMock.miscItem.update).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.update).toHaveBeenCalledWith(updateArgsMock);
      });

      it('should throw NotFoundException when updating non-existent miscItem', async () => {
        const updateDto = { name: 'Updated MiscItem' };

        prismaMock.miscItem.update.mockRejectedValue({
          code: 'P2025',
          clientVersion: '4.7.1',
        });

        await expect(service.updateMiscItem(999, updateDto)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.miscItem.update).toHaveBeenCalledTimes(0);
      });
    });

    describe('remove', () => {
      it('should delete a miscItem without miscItems', async () => {
        const miscItemToDelete: MiscItem = {
          id: 1,
          name: 'MiscItem One',
        };
        const deleteArgsMock: Prisma.MiscItemDeleteArgs = {
          where: { id: miscItemToDelete.id },
        };

        prismaMock.miscItem.findUnique.mockResolvedValue(miscItemToDelete);
        prismaMock.miscItem.delete.mockResolvedValue(miscItemToDelete);

        const result = await service.removeMiscItem(1);
        expect(result).toEqual(miscItemToDelete);
        expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.delete).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.delete).toHaveBeenCalledWith(deleteArgsMock);
      });

      it('should throw NotFoundException when deleting non-existent miscItem', async () => {
        prismaMock.miscItem.findUnique.mockResolvedValue(null);

        await expect(service.removeMiscItem(999)).rejects.toThrow(
          NotFoundException,
        );
        expect(prismaMock.miscItem.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.miscItem.delete).not.toHaveBeenCalled();
      });
    });
  });
});
