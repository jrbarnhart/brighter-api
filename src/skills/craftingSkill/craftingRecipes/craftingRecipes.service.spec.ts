import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CraftingRecipesService } from './craftingRecipes.service';
import { PrismaService } from 'src/prisma.service';
import { CraftingRecipe } from '@prisma/client';
import { CreateCraftingRecipeDto } from './dto/create-craftingRecipe.dto';
import { UpdateCraftingRecipeDto } from './dto/update-craftingRecipe.dto';

describe('CraftingRecipesService', () => {
  let service: CraftingRecipesService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CraftingRecipesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CraftingRecipesService>(CraftingRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all craftingRecipes array', async () => {
      const allCraftingRecipes: CraftingRecipe[] = [
        { id: 1, name: 'CraftingRecipe One', requirementId: null },
        { id: 2, name: 'CraftingRecipe Two', requirementId: null },
      ];

      prismaMock.craftingRecipe.findMany.mockResolvedValue(allCraftingRecipes);

      const result = await service.findAll();
      expect(result).toEqual(allCraftingRecipes);
      expect(prismaMock.craftingRecipe.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no craftingRecipes', async () => {
      prismaMock.craftingRecipe.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.craftingRecipe.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the craftingRecipe if it exists', async () => {
      const existingCraftingRecipe: CraftingRecipe = {
        id: 1,
        name: 'CraftingRecipe One',
        requirementId: null,
      };

      prismaMock.craftingRecipe.findUnique.mockResolvedValue(
        existingCraftingRecipe,
      );

      const result = await service.findOne(existingCraftingRecipe.id);
      expect(result).toEqual(existingCraftingRecipe);
      expect(prismaMock.craftingRecipe.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if craftingRecipe does not exist', async () => {
      prismaMock.craftingRecipe.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.craftingRecipe.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new craftingRecipe', async () => {
      const createDto: CreateCraftingRecipeDto = {
        name: 'CraftingRecipe One',
      };
      const createdCraftingRecipe: CraftingRecipe = {
        id: 1,
        name: 'CraftingRecipe One',
        requirementId: null,
      };

      prismaMock.craftingRecipe.create.mockResolvedValue(createdCraftingRecipe);

      const result = await service.create(createDto);
      expect(result).toEqual(createdCraftingRecipe);
      expect(prismaMock.craftingRecipe.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateCraftingRecipeDto = {
        name: 'CraftingRecipe One',
      };

      prismaMock.craftingRecipe.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.craftingRecipe.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing craftingRecipe', async () => {
      const existingCraftingRecipe: CraftingRecipe = {
        id: 1,
        name: 'CraftingRecipe One',
        requirementId: null,
      };
      const updateDto: UpdateCraftingRecipeDto = {
        name: 'Updated CraftingRecipe',
      };
      const updatedCraftingRecipe: CraftingRecipe = {
        id: 1,
        name: 'Updated CraftingRecipe',
        requirementId: null,
      };

      prismaMock.craftingRecipe.findUnique.mockResolvedValue(
        existingCraftingRecipe,
      );
      prismaMock.craftingRecipe.update.mockResolvedValue(updatedCraftingRecipe);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedCraftingRecipe);
      expect(prismaMock.craftingRecipe.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent craftingRecipe', async () => {
      const updateDto: UpdateCraftingRecipeDto = {
        name: 'Updated CraftingRecipe',
      };

      prismaMock.craftingRecipe.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.craftingRecipe.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a craftingRecipe', async () => {
      const craftingRecipeToDelete: CraftingRecipe = {
        id: 1,
        name: 'CraftingRecipe One',
        requirementId: null,
      };

      prismaMock.craftingRecipe.findUnique.mockResolvedValue(
        craftingRecipeToDelete,
      );
      prismaMock.craftingRecipe.delete.mockResolvedValue(
        craftingRecipeToDelete,
      );

      const result = await service.remove(1);
      expect(result).toEqual(craftingRecipeToDelete);
      expect(prismaMock.craftingRecipe.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.craftingRecipe.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent craftingRecipe', async () => {
      prismaMock.craftingRecipe.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.craftingRecipe.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.craftingRecipe.delete).not.toHaveBeenCalled();
    });
  });
});
