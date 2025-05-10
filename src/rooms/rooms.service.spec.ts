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
        {
          id: 1,
          name: 'Room One',
          obelisk: true,
          portal: false,
          rift: false,
          regionId: 10,
          banks: [],
        },
        {
          id: 2,
          name: 'Room Two',
          obelisk: false,
          portal: true,
          rift: false,
          regionId: 10,
          banks: [],
        },
      ];
      const findManyArgsMock: Prisma.RoomFindManyArgs = {
        include: {
          craftingSkills: true,
          monsters: true,
          npcs: { include: { vendor: true } },
          questSteps: { include: { quest: true } },
          region: true,
          resources: true,
        },
      };

      prismaMock.room.findMany.mockResolvedValue(allRooms);

      const result = await service.findAll();
      expect(result).toEqual(allRooms);
      expect(prismaMock.room.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findMany).toHaveBeenCalledWith(findManyArgsMock);
    });

    it('should return empty array if there are no rooms', async () => {
      const findManyArgsMock: Prisma.RoomFindManyArgs = {
        include: {
          craftingSkills: true,
          monsters: true,
          npcs: { include: { vendor: true } },
          questSteps: { include: { quest: true } },
          region: true,
          resources: true,
        },
      };

      prismaMock.room.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.room.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findMany).toHaveBeenCalledWith(findManyArgsMock);
    });
  });

  describe('getRoomById', () => {
    it('should return the room if it exists', async () => {
      const existingRoom: Room = {
        id: 1,
        name: 'Room One',
        obelisk: true,
        portal: false,
        rift: false,
        regionId: 10,
        banks: [],
      };
      const findUniqueArgsMock: Prisma.RoomFindUniqueArgs = {
        where: { id: existingRoom.id },
        include: {
          craftingSkills: true,
          monsters: true,
          npcs: { include: { vendor: true } },
          questSteps: { include: { quest: true } },
          region: true,
          resources: true,
        },
      };

      prismaMock.room.findUnique.mockResolvedValue(existingRoom);

      const result = await service.findOne(existingRoom.id);
      expect(result).toEqual(existingRoom);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findUnique).toHaveBeenCalledWith(
        findUniqueArgsMock,
      );
    });

    it('should throw NotFoundException if room does not exist', async () => {
      const findUniqueArgsMock: Prisma.RoomFindUniqueArgs = {
        where: { id: 999 },
        include: {
          craftingSkills: true,
          monsters: true,
          npcs: { include: { vendor: true } },
          questSteps: { include: { quest: true } },
          region: true,
          resources: true,
        },
      };

      prismaMock.room.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.findUnique).toHaveBeenCalledWith(
        findUniqueArgsMock,
      );
    });
  });

  describe('create', () => {
    it('should create a new room', async () => {
      const createDto: CreateRoomDto = {
        name: 'Room One',
        obelisk: true,
        portal: false,
        rift: false,
        regionId: 10,
      };
      const createdRoom: Room = {
        id: 1,
        name: 'Room One',
        obelisk: true,
        portal: false,
        rift: false,
        regionId: 10,
        banks: [],
      };
      const createArgsMock: Prisma.RoomCreateArgs = { data: createDto };

      prismaMock.room.create.mockResolvedValue(createdRoom);

      const result = await service.create(createDto);
      expect(result).toEqual(createdRoom);
      expect(prismaMock.room.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.create).toHaveBeenCalledWith(createArgsMock);
    });

    it('should throw BadRequestException on duplicate name', async () => {
      const createDto: CreateRoomDto = {
        name: 'Room One',
        obelisk: true,
        portal: false,
        rift: false,
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
        rift: false,
        regionId: 10,
        banks: [],
      };
      const updateDto: UpdateRoomDto = { name: 'Updated Room' };
      const updatedRoom: Room = {
        id: 1,
        name: 'Updated Room',
        obelisk: true,
        portal: false,
        rift: false,
        regionId: 10,
        banks: [],
      };
      const updateArgsMock: Prisma.RoomUpdateArgs = {
        where: { id: existingRoom.id },
        data: updateDto,
      };

      prismaMock.room.findUnique.mockResolvedValue(existingRoom);
      prismaMock.room.update.mockResolvedValue(updatedRoom);

      const result = await service.update(1, updateDto);
      expect(result).toEqual(updatedRoom);
      expect(prismaMock.room.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.update).toHaveBeenCalledWith(updateArgsMock);
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
        rift: false,
        regionId: 10,
        banks: [],
      };
      const deleteArgsMock: Prisma.RoomDeleteArgs = {
        where: { id: roomToDelete.id },
      };

      prismaMock.room.findUnique.mockResolvedValue(roomToDelete);
      prismaMock.room.delete.mockResolvedValue(roomToDelete);

      const result = await service.remove(1);
      expect(result).toEqual(roomToDelete);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.delete).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.delete).toHaveBeenCalledWith(deleteArgsMock);
    });

    it('should throw NotFoundException when deleting non-existent room', async () => {
      prismaMock.room.findUnique.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prismaMock.room.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.room.delete).not.toHaveBeenCalled();
    });
  });
});
