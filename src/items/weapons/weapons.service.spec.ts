import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { PrismaService } from 'src/prisma.service';
import { Weapon } from '@prisma/client';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

describe('WeaponsService', () => {
  let service: WeaponsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<WeaponsService>(WeaponsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all weapons array', async () => {
      const allWeapons: Weapon[] = [
        {
          id: 1,
          name: 'Weapon One',
          element: 'TEMPESTAE',
          faction: 'HAMMERMAGE',
          isTwoHanded: true,
          isRanged: false,
        },
        {
          id: 2,
          name: 'Weapon Two',
          element: 'TEMPESTAE',
          faction: 'HAMMERMAGE',
          isTwoHanded: true,
          isRanged: true,
        },
      ];

      prismaMock.weapon.findMany.mockResolvedValue(allWeapons);

      const result = await service.findAll();
      expect(result).toEqual(allWeapons);
      expect(prismaMock.weapon.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return empty array if there are no weapons', async () => {
      prismaMock.weapon.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.weapon.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return the weapon if it exists', async () => {
      const existingWeapon: Weapon = {
        id: 1,
        name: 'Weapon One',
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };

      prismaMock.weapon.findUnique.mockResolvedValue(existingWeapon);

      const result = await service.findOne(existingWeapon.id);
      expect(result).toEqual(existingWeapon);
      expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if weapon does not exist', async () => {
      prismaMock.weapon.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new weapon', async () => {
      const createDto: CreateWeaponDto = {
        name: 'Weapon One',
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };
      const createdWeapon: Weapon = {
        id: 1,
        name: 'Weapon One',
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };

      prismaMock.weapon.create.mockResolvedValue(createdWeapon);

      const result = await service.create(createDto);
      expect(result).toEqual(createdWeapon);
      expect(prismaMock.weapon.create).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateWeaponDto = {
        name: 'Weapon One',
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };

      prismaMock.weapon.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
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
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };
      const updateDto: UpdateWeaponDto = { name: 'Updated Weapon' };
      const updatedWeapon: Weapon = {
        id: 1,
        name: 'Updated Weapon',
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };

      prismaMock.weapon.findUnique.mockResolvedValue(existingWeapon);
      prismaMock.weapon.update.mockResolvedValue(updatedWeapon);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedWeapon);
      expect(prismaMock.weapon.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when updating non-existent weapon', async () => {
      const updateDto = { name: 'Updated Weapon' };

      prismaMock.weapon.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.weapon.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a weapon', async () => {
      const weaponToDelete: Weapon = {
        id: 1,
        name: 'Weapon One',
        element: 'TEMPESTAE',
        faction: 'HAMMERMAGE',
        isTwoHanded: true,
        isRanged: false,
      };

      prismaMock.weapon.findUnique.mockResolvedValue(weaponToDelete);
      prismaMock.weapon.delete.mockResolvedValue(weaponToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(weaponToDelete);
      expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.weapon.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when deleting non-existent weapon', async () => {
      prismaMock.weapon.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.weapon.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.weapon.delete).not.toHaveBeenCalled();
    });
  });
});
