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
import { ArmorsService } from './armors.service';
import { CreateArmorDto } from './dto/create-armor.dto';
import { UpdateArmorDto } from './dto/update-armor.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ArmorEntity, ArmorBaseEntity } from './entities/armors.entity';

@Controller('armors')
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create armor',
    description: 'This creates a new armor record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Armor created', type: ArmorBaseEntity })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createArmorDto: CreateArmorDto) {
    return this.armorsService.create(createArmorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all armor',
    description: 'This gets all armor records',
  })
  @ApiOkResponse({ description: 'Found all armor records', type: ArmorEntity })
  findAll() {
    return this.armorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get armor by id',
    description: 'This gets one armor by its id',
  })
  @ApiOkResponse({ description: 'Found armor record', type: ArmorEntity })
  @ApiNotFoundResponse({ description: 'Armor not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.armorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update armor',
    description: 'This updates an armor record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated armor record', type: ArmorBaseEntity })
  @ApiNotFoundResponse({ description: 'Armor not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateArmorDto: UpdateArmorDto,
  ) {
    return this.armorsService.update(id, updateArmorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete armor',
    description: 'This deletes an armor record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Armor was deleted', type: ArmorBaseEntity })
  @ApiNotFoundResponse({ description: 'Armor not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.armorsService.remove(id);
  }
}
