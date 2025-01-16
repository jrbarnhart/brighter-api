import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, Room } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomsController', () => {
  let controller: RoomsController;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let jwtServiceMock: DeepMockProxy<JwtService>;
  let configServiceMock: DeepMockProxy<ConfigService>;
  let roomsServiceMock: DeepMockProxy<RoomsService>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    jwtServiceMock = mockDeep<JwtService>();
    configServiceMock = mockDeep<ConfigService>();
    roomsServiceMock = mockDeep<RoomsService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        RoomsService,
        { provide: RoomsService, useValue: roomsServiceMock },
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of rooms', async () => {
      const allRooms: Room[] = [{ id: 1, name: 'Room One', regionId: 2 }];

      roomsServiceMock.findAll.mockResolvedValue(allRooms);

      expect(await controller.findAll()).toBe(allRooms);
    });

    it('should return empty array when there are no rooms', async () => {
      const allRooms: Room[] = [];

      roomsServiceMock.findAll.mockResolvedValue(allRooms);

      expect(await controller.findAll()).toBe(allRooms);
    });
  });

  describe('findOne', () => {
    it('should return the room if it exists', async () => {
      const room: Room = { id: 1, name: 'Room One', regionId: 2 };

      roomsServiceMock.findOne.mockResolvedValue(room);

      expect(await controller.findOne(room.id)).toBe(room);
    });

    it('should propagate NotFoundException if room does not exist', async () => {
      roomsServiceMock.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should add a new room', async () => {
      const roomDto: CreateRoomDto = { name: 'New Room', regionId: 2 };
      const room: Room = { id: 1, ...roomDto };

      roomsServiceMock.create.mockResolvedValue(room);

      expect(await controller.create(roomDto)).toBe(room);
    });

    it('should propagate a BadRequestException when room name already exists', async () => {
      const roomDto: CreateRoomDto = { name: 'New Room', regionId: 2 };
      roomsServiceMock.create.mockRejectedValue(new BadRequestException());

      await expect(controller.create(roomDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update the room if it exists', async () => {
      const updateRoomDto: UpdateRoomDto = { name: 'Updated Room' };
      const updatedRoom: Room = { id: 1, name: 'Updated Room', regionId: 2 };

      roomsServiceMock.update.mockResolvedValue(updatedRoom);

      expect(await controller.update(updatedRoom.id, updateRoomDto)).toBe(
        updatedRoom,
      );
    });

    it('should propagate a NotFoundException if the room does not exist', async () => {
      const updateRoomDto: UpdateRoomDto = { name: 'Updated Room' };
      roomsServiceMock.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(999, updateRoomDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete the room if it exists', async () => {
      const room: Room = { id: 1, name: 'Updated Room', regionId: 2 };

      roomsServiceMock.remove.mockResolvedValue(room);

      expect(await controller.remove(room.id)).toBe(room);
    });

    it('should propagate NotFoundException if the room does not exist', async () => {
      roomsServiceMock.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });

    it('should propagate a BadRequestException if the room has contents', async () => {
      roomsServiceMock.remove.mockRejectedValue(new BadRequestException());

      await expect(controller.remove(999)).rejects.toThrow(BadRequestException);
    });
  });
});
