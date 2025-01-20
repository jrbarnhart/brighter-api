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
import { WeaponsService } from './weapons.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('items/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create weapon',
    description: 'This creates a new weapon record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Weapon created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createWeaponDto: CreateWeaponDto) {
    return this.weaponsService.create(createWeaponDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all weapon',
    description: 'This gets all weapon records',
  })
  @ApiOkResponse({ description: 'Found all weapon records' })
  findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get weapon by id',
    description: 'This gets one weapon by its id',
  })
  @ApiOkResponse({ description: 'Found weapon record' })
  @ApiNotFoundResponse({ description: 'Weapon not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weaponsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update weapon',
    description: 'This updates an weapon record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Weapon not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateWeaponDto: UpdateWeaponDto,
  ) {
    return this.weaponsService.update(id, updateWeaponDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete weapon',
    description: 'This deletes an weapon record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Weapon was deleted' })
  @ApiNotFoundResponse({ description: 'Weapon not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.weaponsService.remove(id);
  }
}
