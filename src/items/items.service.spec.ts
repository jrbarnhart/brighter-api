import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Prisma, PrismaClient, ResourceVariant } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';

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
  });
});
