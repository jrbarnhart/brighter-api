import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateCraftingRecipeDto } from './dto/create-craftingRecipe.dto';
import { UpdateCraftingRecipeDto } from './dto/update-craftingRecipe.dto';
import { CraftingRecipe } from '@prisma/client';

@Injectable()
export class CraftingRecipesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCraftingRecipeDto: CreateCraftingRecipeDto,
  ): Promise<CraftingRecipe> {
    try {
      const {
        name,
        inputItemIds,
        inputResourceVariantIds,
        outputArmorVariantId,
        outputConsumableVariantId,
        outputWeaponVariantId,
      } = createCraftingRecipeDto;
      return await this.prisma.craftingRecipe.create({
        data: {
          name,
          inputResourceVariants: inputResourceVariantIds
            ? { connect: inputResourceVariantIds.map((id) => ({ id })) }
            : undefined,
          inputItems: inputItemIds
            ? { connect: inputItemIds.map((id) => ({ id })) }
            : undefined,
          outputArmorVariantId,
          outputConsumableVariantId,
          outputWeaponVariantId,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<CraftingRecipe[]> {
    return this.prisma.craftingRecipe.findMany({
      include: {
        inputItems: true,
        inputResourceVariants: { include: { resource: true } },
        outputArmorVariant: { include: { armor: true } },
        outputConsumableVariant: { include: { consumable: true } },
        outputWeaponVariant: { include: { weapon: true } },
        requirement: { include: { skill: true } },
      },
    });
  }

  async findOne(id: number): Promise<CraftingRecipe> {
    const foundCraftingRecipe = await this.prisma.craftingRecipe.findUnique({
      where: { id },
      include: {
        inputItems: true,
        inputResourceVariants: { include: { resource: true } },
        outputArmorVariant: { include: { armor: true } },
        outputConsumableVariant: { include: { consumable: true } },
        outputWeaponVariant: { include: { weapon: true } },
        requirement: { include: { skill: true } },
      },
    });

    if (foundCraftingRecipe === null) {
      throw new NotFoundException();
    }

    return foundCraftingRecipe;
  }

  async update(
    id: number,
    updateCraftingRecipeDto: UpdateCraftingRecipeDto,
  ): Promise<CraftingRecipe> {
    const craftingRecipeToUpdate = await this.prisma.craftingRecipe.findUnique({
      where: { id },
    });

    if (!craftingRecipeToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      const {
        name,
        inputResourceVariantIds,
        removeInputResourceVariantIds,
        inputItemIds,
        removeInputItemIds,
        outputArmorVariantId,
        outputConsumableVariantId,
        outputWeaponVariantId,
      } = updateCraftingRecipeDto;
      return await this.prisma.craftingRecipe.update({
        where: { id },
        data: {
          name,
          inputResourceVariants:
            inputResourceVariantIds || removeInputResourceVariantIds
              ? {
                  connect: inputResourceVariantIds?.map((id) => ({ id })),
                  disconnect: removeInputResourceVariantIds?.map((id) => ({
                    id,
                  })),
                }
              : undefined,
          inputItems:
            inputItemIds || removeInputItemIds
              ? {
                  connect: inputItemIds?.map((id) => ({ id })),
                  disconnect: removeInputItemIds?.map((id) => ({ id })),
                }
              : undefined,
          outputArmorVariantId,
          outputConsumableVariantId,
          outputWeaponVariantId,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<CraftingRecipe> {
    const craftingRecipeToDelete = await this.prisma.craftingRecipe.findUnique({
      where: { id },
    });

    if (!craftingRecipeToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.craftingRecipe.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
