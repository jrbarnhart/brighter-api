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
import { ConsumablesService } from './consumables.service';
import { CreateConsumableDto } from './dto/create-consumable.dto';
import { UpdateConsumableDto } from './dto/update-consumable.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConsumableEntity } from './entities/consumables.entity';

@Controller('consumables')
export class ConsumablesController {
  constructor(private readonly consumablesService: ConsumablesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create consumable',
    description: 'This creates a new consumable record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Consumable created',
    type: ConsumableEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createConsumableDto: CreateConsumableDto) {
    return this.consumablesService.create(createConsumableDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all consumable',
    description: 'This gets all consumable records',
  })
  @ApiOkResponse({
    description: 'Found all consumable records',
    type: ConsumableEntity,
  })
  findAll() {
    return this.consumablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get consumable by id',
    description: 'This gets one consumable by its id',
  })
  @ApiOkResponse({
    description: 'Found consumable record',
    type: ConsumableEntity,
  })
  @ApiNotFoundResponse({ description: 'Consumable not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consumablesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update consumable',
    description: 'This updates an consumable record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated consumable record',
    type: ConsumableEntity,
  })
  @ApiNotFoundResponse({ description: 'Consumable not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateConsumableDto: UpdateConsumableDto,
  ) {
    return this.consumablesService.update(id, updateConsumableDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete consumable',
    description: 'This deletes an consumable record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Consumable was deleted',
    type: ConsumableEntity,
  })
  @ApiNotFoundResponse({ description: 'Consumable not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consumablesService.remove(id);
  }
}
