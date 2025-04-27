import { Injectable, NotFoundException } from '@nestjs/common';
import prismaError from 'src/validation/prismaError';
import { PrismaService } from 'src/prisma.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from '@prisma/client';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    try {
      const {
        npcId,
        name,
        armorVariantIds,
        consumableVariantIds,
        miscItemIds,
        resourceVariantIds,
        weaponVariantIds,
      } = createVendorDto;
      return await this.prisma.vendor.create({
        data: {
          npcId,
          name,
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
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  findAll(): Promise<Vendor[]> {
    return this.prisma.vendor.findMany({
      include: {
        armorVariants: { include: { armor: true } },
        consumableVariants: { include: { consumable: true } },
        miscItems: true,
        npc: true,
        resourceVariants: { include: { resource: true } },
        weaponVariants: { include: { weapon: true } },
      },
    });
  }

  async findOne(id: number): Promise<Vendor> {
    const foundVendor = await this.prisma.vendor.findUnique({
      where: { id },
      include: {
        armorVariants: { include: { armor: true } },
        consumableVariants: { include: { consumable: true } },
        miscItems: true,
        npc: true,
        resourceVariants: { include: { resource: true } },
        weaponVariants: { include: { weapon: true } },
      },
    });

    if (foundVendor === null) {
      throw new NotFoundException();
    }

    return foundVendor;
  }

  async update(id: number, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    const vendorToUpdate = await this.prisma.vendor.findUnique({
      where: { id },
    });

    if (!vendorToUpdate) {
      throw new NotFoundException('Record not found');
    }

    try {
      const {
        npcId,
        name,
        armorVariantIds,
        consumableVariantIds,
        miscItemIds,
        resourceVariantIds,
        weaponVariantIds,
        removeArmorVariantIds,
        removeConsumableVariantIds,
        removeMiscItemIds,
        removeResourceVariantIds,
        removeWeaponVariantIds,
      } = updateVendorDto;
      return await this.prisma.vendor.update({
        where: { id },
        data: {
          npcId,
          name,
          resourceVariants:
            resourceVariantIds || removeResourceVariantIds
              ? {
                  connect: resourceVariantIds?.map((id) => ({ id })),
                  disconnect: removeResourceVariantIds?.map((id) => ({ id })),
                }
              : undefined,
          miscItems:
            miscItemIds || removeMiscItemIds
              ? {
                  connect: miscItemIds?.map((id) => ({ id })),
                  disconnect: removeMiscItemIds?.map((id) => ({ id })),
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
          weaponVariants:
            weaponVariantIds || removeWeaponVariantIds
              ? {
                  connect: weaponVariantIds?.map((id) => ({ id })),
                  disconnect: removeWeaponVariantIds?.map((id) => ({ id })),
                }
              : undefined,
        },
      });
    } catch (error) {
      throw prismaError(error);
    }
  }

  async remove(id: number): Promise<Vendor> {
    const vendorToDelete = await this.prisma.vendor.findUnique({
      where: { id },
    });

    if (!vendorToDelete) {
      throw new NotFoundException('Record not found');
    }

    try {
      return await this.prisma.vendor.delete({ where: { id } });
    } catch (error) {
      throw prismaError(error);
    }
  }
}
