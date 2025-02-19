import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateDropTableDto } from './dto/create-dropTable.dto';
import { UpdateDropTableDto } from './dto/update-dropTable.dto';
import { DropTable } from '@prisma/client';

@Injectable()
export class DropTablesService {
  constructor(private prisma: PrismaService) {}

  async create(createDropTableDto: CreateDropTableDto): Promise<DropTable> {
    try {
      const {
        monsterVariantId,
        resourceVariantIds,
        weaponVariantIds,
        armorVariantIds,
        consumableVariantIds,
        miscItemIds,
        currency,
      } = createDropTableDto;
      return await this.prisma.dropTable.create({
        data: {
          monsterVariantId,
          resourceVariants: resourceVariantIds
            ? { connect: resourceVariantIds.map((id) => ({ id })) }
            : undefined,
          miscItems: miscItemIds
            ? { connect: miscItemIds.map((id) => ({ id })) }
            : undefined,
          armorVariants: armorVariantIds
            ? { connect: armorVariantIds.map((id) => ({ id })) }
            : undefined,
          consumableVariants: consumableVariantIds
            ? { connect: consumableVariantIds.map((id) => ({ id })) }
            : undefined,
          weaponVariants: weaponVariantIds
            ? { connect: weaponVariantIds.map((id) => ({ id })) }
            : undefined,
          currency,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<DropTable[]> {
    return this.prisma.dropTable.findMany({
      include: {
        armorVariants: true,
        consumableVariants: true,
        miscItems: true,
        monsterVariant: { include: { monster: true } },
        resourceVariants: true,
        weaponVariants: true,
      },
    });
  }

  async findOne(id: number): Promise<DropTable> {
    const foundDropTable = await this.prisma.dropTable.findUnique({
      where: { id },
      include: {
        armorVariants: true,
        consumableVariants: true,
        miscItems: true,
        monsterVariant: { include: { monster: true } },
        resourceVariants: true,
        weaponVariants: true,
      },
    });

    if (foundDropTable === null) {
      throw new NotFoundException();
    }

    return foundDropTable;
  }

  async update(
    id: number,
    updateDropTableDto: UpdateDropTableDto,
  ): Promise<DropTable> {
    const dropTableToUpdate = await this.prisma.dropTable.findUnique({
      where: { id },
    });

    if (!dropTableToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      const {
        monsterVariantId,
        resourceVariantIds,
        weaponVariantIds,
        armorVariantIds,
        consumableVariantIds,
        miscItemIds,
        currency,
        removeResourceVariantIds,
        removeWeaponVariantIds,
        removeArmorVariantIds,
        removeConsumableVariantIds,
        removeMiscItemIds,
      } = updateDropTableDto;
      return await this.prisma.dropTable.update({
        where: { id },
        data: {
          monsterVariantId,
          resourceVariants:
            resourceVariantIds || removeResourceVariantIds
              ? {
                  connect: resourceVariantIds?.map((id) => ({ id })),
                  disconnect: removeResourceVariantIds?.map((id) => ({ id })),
                }
              : undefined,
          weaponVariants:
            weaponVariantIds || removeWeaponVariantIds
              ? {
                  connect: weaponVariantIds?.map((id) => ({ id })),
                  disconnect: removeWeaponVariantIds?.map((id) => ({ id })),
                }
              : undefined,
          armorVariants:
            armorVariantIds || removeArmorVariantIds
              ? {
                  connect: armorVariantIds?.map((id) => ({ id })),
                  disconnect: removeArmorVariantIds?.map((id) => ({ id })),
                }
              : undefined,
          consumableVariants:
            consumableVariantIds || removeConsumableVariantIds
              ? {
                  connect: consumableVariantIds?.map((id) => ({ id })),
                  disconnect: removeConsumableVariantIds?.map((id) => ({ id })),
                }
              : undefined,
          miscItems:
            miscItemIds || removeMiscItemIds
              ? {
                  connect: miscItemIds?.map((id) => ({ id })),
                  disconnect: removeMiscItemIds?.map((id) => ({ id })),
                }
              : undefined,
          currency,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<DropTable> {
    const dropTableToDelete = await this.prisma.dropTable.findUnique({
      where: { id },
    });

    if (!dropTableToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.dropTable.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
