import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { PrismaService } from 'src/prisma.service';
import { Vendor } from '@prisma/client';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

describe('VendorsService', () => {
  let service: VendorsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<VendorsService>(VendorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all vendors array', async () => {
      const allVendors: Vendor[] = [
        { id: 1, npcId: 10, name: null },
        { id: 2, npcId: 20, name: null },
      ];

      prismaMock.vendor.findMany.mockResolvedValue(allVendors);

      const result = await service.findAll();
      expect(result).toEqual(allVendors);
      expect(prismaMock.vendor.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no vendors', async () => {
      prismaMock.vendor.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.vendor.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the vendor if it exists', async () => {
      const existingVendor: Vendor = {
        id: 1,
        npcId: 10,
        name: null,
      };

      prismaMock.vendor.findUnique.mockResolvedValue(existingVendor);

      const result = await service.findOne(existingVendor.id);
      expect(result).toEqual(existingVendor);
      expect(prismaMock.vendor.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if vendor does not exist', async () => {
      prismaMock.vendor.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.vendor.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new vendor', async () => {
      const createDto: CreateVendorDto = {
        npcId: 10,
      };
      const createdVendor: Vendor = {
        id: 1,
        npcId: 10,
        name: null,
      };

      prismaMock.vendor.create.mockResolvedValue(createdVendor);

      const result = await service.create(createDto);
      expect(result).toEqual(createdVendor);
      expect(prismaMock.vendor.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateVendorDto = {
        npcId: 10,
      };

      prismaMock.vendor.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.vendor.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing vendor', async () => {
      const existingVendor: Vendor = {
        id: 1,
        npcId: 10,
        name: null,
      };
      const updateDto: UpdateVendorDto = { npcId: 10 };
      const updatedVendor: Vendor = {
        id: 1,
        npcId: 10,
        name: null,
      };

      prismaMock.vendor.findUnique.mockResolvedValue(existingVendor);
      prismaMock.vendor.update.mockResolvedValue(updatedVendor);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedVendor);
      expect(prismaMock.vendor.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent vendor', async () => {
      const updateDto: UpdateVendorDto = { npcId: 10 };

      prismaMock.vendor.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.vendor.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a vendor', async () => {
      const vendorToDelete: Vendor = {
        id: 1,
        npcId: 10,
        name: null,
      };

      prismaMock.vendor.findUnique.mockResolvedValue(vendorToDelete);
      prismaMock.vendor.delete.mockResolvedValue(vendorToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(vendorToDelete);
      expect(prismaMock.vendor.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.vendor.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent vendor', async () => {
      prismaMock.vendor.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.vendor.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.vendor.delete).not.toHaveBeenCalled();
    });
  });
});
