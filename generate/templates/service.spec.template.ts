export const serviceSpecTemplate = `
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { __PASCAL_PLURAL__Service } from './__PLURAL__.service';
import { PrismaService } from 'src/prisma.service';
import { __PASCAL__ } from '@prisma/client';
import { Create__PASCAL__Dto } from './dto/create-__CAMEL__.dto';
import { Update__PASCAL__Dto } from './dto/update-__CAMEL__.dto';

describe('__PASCAL_PLURAL__Service', () => {
  let service: __PASCAL_PLURAL__Service;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        __PASCAL_PLURAL__Service,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<__PASCAL_PLURAL__Service>(__PASCAL_PLURAL__Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all __PLURAL__ array', async () => {
      const all__PASCAL_PLURAL__: __PASCAL__[] = [
        { id: 1, name: '__PASCAL__ One' },
        { id: 2, name: '__PASCAL__ Two' },
      ];

      prismaMock.__CAMEL__.findMany.mockResolvedValue(all__PASCAL_PLURAL__);

      const result = await service.findAll();
      expect(result).toEqual(all__PASCAL_PLURAL__);
      expect(prismaMock.__CAMEL__.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no __PLURAL__', async () => {
      prismaMock.__CAMEL__.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.__CAMEL__.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the __CAMEL__ if it exists', async () => {
      const existing__PASCAL__: __PASCAL__ = {
        id: 1,
        name: '__PASCAL__ One',
      };

      prismaMock.__CAMEL__.findUnique.mockResolvedValue(existing__PASCAL__);

      const result = await service.findOne(existing__PASCAL__.id);
      expect(result).toEqual(existing__PASCAL__);
      expect(prismaMock.__CAMEL__.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if __CAMEL__ does not exist', async () => {
      prismaMock.__CAMEL__.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.__CAMEL__.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new __CAMEL__', async () => {
      const createDto: Create__PASCAL__Dto = {
        name: '__PASCAL__ One',
      };
      const created__PASCAL__: __PASCAL__ = {
        id: 1,
        name: '__PASCAL__ One',
      };

      prismaMock.__CAMEL__.create.mockResolvedValue(created__PASCAL__);

      const result = await service.create(createDto);
      expect(result).toEqual(created__PASCAL__);
      expect(prismaMock.__CAMEL__.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: Create__PASCAL__Dto = {
        name: '__PASCAL__ One',
      };

      prismaMock.__CAMEL__.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(prismaMock.__CAMEL__.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing __CAMEL__', async () => {
      const existing__PASCAL__: __PASCAL__ = {
        id: 1,
        name: '__PASCAL__ One',
      };
      const updateDto: Update__PASCAL__Dto = { name: 'Updated __PASCAL__' };
      const updated__PASCAL__: __PASCAL__ = {
        id: 1,
        name: 'Updated __PASCAL__',
      };

      prismaMock.__CAMEL__.findUnique.mockResolvedValue(existing__PASCAL__);
      prismaMock.__CAMEL__.update.mockResolvedValue(updated__PASCAL__);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updated__PASCAL__);
      expect(prismaMock.__CAMEL__.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent __CAMEL__', async () => {
      const updateDto = { name: 'Updated __PASCAL__' };

      prismaMock.__CAMEL__.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
      expect(prismaMock.__CAMEL__.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a __CAMEL__', async () => {
      const __CAMEL__ToDelete: __PASCAL__ = {
        id: 1,
        name: '__PASCAL__ One',
      };

      prismaMock.__CAMEL__.findUnique.mockResolvedValue(__CAMEL__ToDelete);
      prismaMock.__CAMEL__.delete.mockResolvedValue(__CAMEL__ToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(__CAMEL__ToDelete);
      expect(prismaMock.__CAMEL__.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.__CAMEL__.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent __CAMEL__', async () => {
      prismaMock.__CAMEL__.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.__CAMEL__.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.__CAMEL__.delete).not.toHaveBeenCalled();
    });
  });
});`;
