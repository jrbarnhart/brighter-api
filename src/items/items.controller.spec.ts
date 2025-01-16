import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, ResourceVariant } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateResourceVariantDto } from './dto/resource/create-resource-variant.dto';
import { UpdateResourceVariantDto } from './dto/resource/update-resource-variant.dto';

describe('ItemsController', () => {
  let controller: ItemsController;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let jwtServiceMock: DeepMockProxy<JwtService>;
  let configServiceMock: DeepMockProxy<ConfigService>;
  let itemsServiceMock: DeepMockProxy<ItemsService>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    jwtServiceMock = mockDeep<JwtService>();
    configServiceMock = mockDeep<ConfigService>();
    itemsServiceMock = mockDeep<ItemsService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
        { provide: ItemsService, useValue: itemsServiceMock },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Resource Variants', () => {
    describe('findAll', () => {
      it('should return an array of resourceVariants', async () => {
        const allResourceVariants: ResourceVariant[] = [
          {
            id: 1,
            name: 'ResourceVariant One',
            resourceId: 10,
            requirementId: null,
          },
        ];

        itemsServiceMock.findAllResourceVariants.mockResolvedValue(
          allResourceVariants,
        );

        expect(await controller.findAllResourceVariants()).toBe(
          allResourceVariants,
        );
      });

      it('should return empty array when there are no resourceVariants', async () => {
        const allResourceVariants: ResourceVariant[] = [];

        itemsServiceMock.findAllResourceVariants.mockResolvedValue(
          allResourceVariants,
        );

        expect(await controller.findAllResourceVariants()).toBe(
          allResourceVariants,
        );
      });
    });

    describe('findOne', () => {
      it('should return the resourceVariant if it exists', async () => {
        const resourceVariant: ResourceVariant = {
          id: 1,
          name: 'ResourceVariant One',
          resourceId: 10,
          requirementId: null,
        };

        itemsServiceMock.findOneResourceVariant.mockResolvedValue(
          resourceVariant,
        );

        expect(
          await controller.findOneResourceVariant(resourceVariant.id),
        ).toBe(resourceVariant);
      });

      it('should propagate NotFoundException if resourceVariant does not exist', async () => {
        itemsServiceMock.findOneResourceVariant.mockRejectedValue(
          new NotFoundException(),
        );

        await expect(controller.findOneResourceVariant(999)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('create', () => {
      it('should add a new resourceVariant', async () => {
        const resourceVariantDto: CreateResourceVariantDto = {
          name: 'ResourceVariant One',
          resourceId: 10,
        };
        const resourceVariant: ResourceVariant = {
          id: 1,
          requirementId: null,
          ...resourceVariantDto,
        };

        itemsServiceMock.createResourceVariant.mockResolvedValue(
          resourceVariant,
        );

        expect(await controller.createResourceVariant(resourceVariantDto)).toBe(
          resourceVariant,
        );
      });

      it('should propagate a BadRequestException when resourceVariant name already exists', async () => {
        const resourceVariantDto: CreateResourceVariantDto = {
          name: 'ResourceVariant One',
          resourceId: 10,
        };
        itemsServiceMock.createResourceVariant.mockRejectedValue(
          new BadRequestException(),
        );

        await expect(
          controller.createResourceVariant(resourceVariantDto),
        ).rejects.toThrow(BadRequestException);
      });
    });

    describe('update', () => {
      it('should update the resourceVariant if it exists', async () => {
        const updateResourceVariantDto: UpdateResourceVariantDto = {
          name: 'Updated ResourceVariant',
        };
        const updatedResourceVariant: ResourceVariant = {
          id: 1,
          name: 'Updated ResourceVariant',
          resourceId: 10,
          requirementId: null,
        };

        itemsServiceMock.updateResourceVariant.mockResolvedValue(
          updatedResourceVariant,
        );

        expect(
          await controller.updateResourceVariant(
            updatedResourceVariant.id,
            updateResourceVariantDto,
          ),
        ).toBe(updatedResourceVariant);
      });

      it('should propagate a NotFoundException if the resourceVariant does not exist', async () => {
        const updateResourceVariantDto: UpdateResourceVariantDto = {
          name: 'Updated ResourceVariant',
        };
        itemsServiceMock.updateResourceVariant.mockRejectedValue(
          new NotFoundException(),
        );

        await expect(
          controller.updateResourceVariant(999, updateResourceVariantDto),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('delete', () => {
      it('should delete the resourceVariant if it exists', async () => {
        const resourceVariant: ResourceVariant = {
          id: 1,
          name: 'ResourceVariant One',
          resourceId: 10,
          requirementId: null,
        };

        itemsServiceMock.removeResourceVariant.mockResolvedValue(
          resourceVariant,
        );

        expect(await controller.removeResourceVariant(resourceVariant.id)).toBe(
          resourceVariant,
        );
      });

      it('should propagate NotFoundException if the resourceVariant does not exist', async () => {
        itemsServiceMock.removeResourceVariant.mockRejectedValue(
          new NotFoundException(),
        );

        await expect(controller.removeResourceVariant(999)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });

  describe('Resources', () => {});

  describe('Consumable Variants', () => {});

  describe('Consumables', () => {});

  describe('Weapon Variants', () => {});

  describe('Weapons', () => {});

  describe('Armor Variants', () => {});

  describe('Armor', () => {});

  describe('Misc Items', () => {});
});
