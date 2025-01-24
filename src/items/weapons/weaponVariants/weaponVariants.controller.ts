import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { WeaponVariantsService } from './weaponVariants.service';
import { CreateWeaponVariantDto } from './dto/create-weaponVariant.dto';
import { UpdateWeaponVariantDto } from './dto/update-weaponVariant.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  WeaponVariantEntity,
  WeaponVariantBaseEntity,
} from './entities/weaponVariants.entity';

@Controller('items/weapons/variants')
export class WeaponVariantsController {
  constructor(private readonly weaponVariantsService: WeaponVariantsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create weaponVariant',
    description: 'This creates a new weaponVariant record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'WeaponVariant created',
    type: WeaponVariantBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createWeaponVariantDto: CreateWeaponVariantDto) {
    return this.weaponVariantsService.create(createWeaponVariantDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all weaponVariant',
    description: 'This gets all weaponVariant records',
  })
  @ApiOkResponse({
    description: 'Found all weaponVariant records',
    type: WeaponVariantEntity,
  })
  findAll() {
    return this.weaponVariantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get weaponVariant by id',
    description: 'This gets one weaponVariant by its id',
  })
  @ApiOkResponse({
    description: 'Found weaponVariant record',
    type: WeaponVariantEntity,
  })
  @ApiNotFoundResponse({ description: 'WeaponVariant not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weaponVariantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update weaponVariant',
    description: 'This updates an weaponVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated weaponVariant record',
    type: WeaponVariantBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'WeaponVariant not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateWeaponVariantDto: UpdateWeaponVariantDto,
  ) {
    return this.weaponVariantsService.update(id, updateWeaponVariantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete weaponVariant',
    description: 'This deletes an weaponVariant record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'WeaponVariant was deleted',
    type: WeaponVariantBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'WeaponVariant not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weaponVariantsService.remove(id);
  }
}
