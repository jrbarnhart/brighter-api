import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { RoomsService } from './rooms.service';
import { Prisma, PrismaClient, Room } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsService', () => {
  let service: RoomsService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllRooms', () => {
    it('should return all rooms array', async () => {
      const allRooms: Room[] = [
        { id: 1, name: 'Room One', obelisk: true, portal: false, regionId: 10 },
        { id: 2, name: 'Room Two', obelisk: false, portal: true, regionId: 10 },
      ];

      const withMock: Prisma.RoomFindManyArgs = {
        include: {
          banks: true,
          craftingSpots: true,
          monsters: true,
          npcs: true,
          questSteps: true,
          region: true,
          resources: true,
        },
      };

      prismaMock.room.findMany.mockResolvedValue(allRooms);

      const result = await service.findAll();
      expect(result).toEqual(allRooms);
      expect(prismaMock.room.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findMany).toHaveBeenCalledWith(withMock);
    });

    it('should return empty array if there are no rooms', async () => {
      prismaMock.room.findMany.mockResolvedValue([]);

      const withMock: Prisma.RoomFindManyArgs = {
        include: {
          banks: true,
          craftingSpots: true,
          monsters: true,
          npcs: true,
          questSteps: true,
          region: true,
          resources: true,
        },
      };

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.room.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findMany).toHaveBeenCalledWith(withMock);
    });
  });

  describe('getRoomById', () => {
    it('should return the room if it exists', async () => {
      const existingRoom: Room = {
        id: 1,
        name: 'Room One',
        obelisk: true,
        portal: false,
        regionId: 10,
      };

      prismaMock.room.findUnique.mockResolvedValue(existingRoom);
      const mockQueryArgs: Prisma.RoomFindUniqueArgs = {
        where: { id: existingRoom.id },
        include: {
          banks: true,
          craftingSpots: true,
          monsters: true,
          npcs: true,
          questSteps: true,
          region: true,
          resources: true,
        },
      };

      const result = await service.findOne(existingRoom.id);
      expect(result).toEqual(existingRoom);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findUnique).toHaveBeenCalledWith(mockQueryArgs);
    });

    it('should throw NotFoundException if room does not exist', async () => {
      prismaMock.room.findUnique.mockResolvedValue(null);
      const mockQueryArgs: Prisma.RoomFindUniqueArgs = {
        where: { id: 999 },
        include: {
          banks: true,
          craftingSpots: true,
          monsters: true,
          npcs: true,
          questSteps: true,
          region: true,
          resources: true,
        },
      };

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findUnique).toHaveBeenCalledWith(mockQueryArgs);
    });
  });

  describe('create', () => {
    it('should create a new room', async () => {
      const createDto: CreateRoomDto = {
        name: 'Room One',
        obelisk: true,
        portal: false,
        regionId: 10,
      };
      const createdRoom: Room = {
        id: 1,
        name: 'Room One',
        obelisk: true,
        portal: false,
        regionId: 10,
      };

      prismaMock.room.create.mockResolvedValue(createdRoom);

      const result = await service.create(createDto);
      expect(result).toEqual(createdRoom);
      expect(prismaMock.room.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateRoomDto = {
        name: 'Room One',
        obelisk: true,
        portal: false,
        regionId: 10,
      };
      prismaMock.room.create.mockRejectedValue({
        code: 'P2002',
        clientVersion: '4.7.1',
      });

      await expect(service.create(createDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prismaMock.room.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing room', async () => {
      const existingRoom: Room = {
        id: 1,
        name: 'Room One',
        obelisk: true,
        portal: false,
        regionId: 10,
      };
      const updateDto: UpdateRoomDto = { name: 'Updated Room' };
      const updatedRoom: Room = {
        id: 1,
        name: 'Updated Room',
        obelisk: true,
        portal: false,
        regionId: 10,
      };

      const updateQueryMock: Prisma.RoomUpdateArgs = {
        where: { id: existingRoom.id },
        data: updateDto,
      };

      prismaMock.room.findUnique.mockResolvedValue(existingRoom);
      prismaMock.room.update.mockResolvedValue(updatedRoom);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedRoom);
      expect(prismaMock.room.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.update).toHaveBeenCalledWith(updateQueryMock);
    });

    it('should throw NotFoundException when updating non-existent room', async () => {
      const updateDto = { name: 'Updated Room' };
      prismaMock.room.update.mockRejectedValue({
        code: 'P2025',
        clientVersion: '4.7.1',
      });

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaMock.room.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should delete a room without rooms', async () => {
      const roomToDelete: Room = {
        id: 1,
        name: 'Room One',
        obelisk: true,
        portal: false,
        regionId: 10,
      };

      const deleteQueryMock: Prisma.RoomDeleteArgs = {
        where: { id: roomToDelete.id },
      };

      prismaMock.room.findUnique.mockResolvedValue(roomToDelete);
      prismaMock.room.delete.mockResolvedValue(roomToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(roomToDelete);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.delete).toHaveBeenCalledWith(deleteQueryMock);
    });

    it('should throw NotFoundException when deleting non-existent room', async () => {
      prismaMock.room.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.delete).not.toHaveBeenCalled();
    });
  });
});
