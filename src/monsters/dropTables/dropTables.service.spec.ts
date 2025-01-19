import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DropTablesService } from './dropTables.service';
import { PrismaService } from 'src/prisma.service';
import { DropTable } from '@prisma/client';
import { CreateDropTableDto } from './dto/create-dropTable.dto';
import { UpdateDropTableDto } from './dto/update-dropTable.dto';

describe('DropTablesService', () => {
  let service: DropTablesService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DropTablesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<DropTablesService>(DropTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all dropTables array', async () => {
      const allDropTables: DropTable[] = [
        { id: 1, monsterVariantId: 10, currency: null },
        { id: 2, monsterVariantId: 20, currency: 10500 },
      ];

      prismaMock.dropTable.findMany.mockResolvedValue(allDropTables);

      const result = await service.findAll();
      expect(result).toEqual(allDropTables);
      expect(prismaMock.dropTable.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no dropTables', async () => {
      prismaMock.dropTable.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.dropTable.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the dropTable if it exists', async () => {
      const existingDropTable: DropTable = {
        id: 1,
        monsterVariantId: 10,
        currency: null,
      };

      prismaMock.dropTable.findUnique.mockResolvedValue(existingDropTable);

      const result = await service.findOne(existingDropTable.id);
      expect(result).toEqual(existingDropTable);
      expect(prismaMock.dropTable.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if dropTable does not exist', async () => {
      prismaMock.dropTable.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.dropTable.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new dropTable', async () => {
      const createDto: CreateDropTableDto = {
        monsterVariantId: 10,
      };
      const createdDropTable: DropTable = {
        id: 1,
        monsterVariantId: 10,
        currency: null,
      };

      prismaMock.dropTable.create.mockResolvedValue(createdDropTable);

      const result = await service.create(createDto);
      expect(result).toEqual(createdDropTable);
      expect(prismaMock.dropTable.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateDropTableDto = {
        monsterVariantId: 10,
      };

      prismaMock.dropTable.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.dropTable.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing dropTable', async () => {
      const existingDropTable: DropTable = {
        id: 1,
        monsterVariantId: 10,
        currency: null,
      };
      const updateDto: UpdateDropTableDto = { monsterVariantId: 10 };
      const updatedDropTable: DropTable = {
        id: 1,
        monsterVariantId: 10,
        currency: null,
      };

      prismaMock.dropTable.findUnique.mockResolvedValue(existingDropTable);
      prismaMock.dropTable.update.mockResolvedValue(updatedDropTable);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedDropTable);
      expect(prismaMock.dropTable.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent dropTable', async () => {
      const updateDto: UpdateDropTableDto = { monsterVariantId: 10 };

      prismaMock.dropTable.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.dropTable.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a dropTable', async () => {
      const dropTableToDelete: DropTable = {
        id: 1,
        monsterVariantId: 10,
        currency: null,
      };

      prismaMock.dropTable.findUnique.mockResolvedValue(dropTableToDelete);
      prismaMock.dropTable.delete.mockResolvedValue(dropTableToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(dropTableToDelete);
      expect(prismaMock.dropTable.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.dropTable.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent dropTable', async () => {
      prismaMock.dropTable.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.dropTable.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.dropTable.delete).not.toHaveBeenCalled();
    });
  });
});
