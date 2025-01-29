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
import { MiscItemsService } from './miscItems.service';
import { CreateMiscItemDto } from './dto/create-miscItem.dto';
import { UpdateMiscItemDto } from './dto/update-miscItem.dto';
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
  MiscItemEntity,
  MiscItemBaseEntity,
} from './entities/miscItems.entity';

@Controller('items/misc')
export class MiscItemsController {
  constructor(private readonly miscItemsService: MiscItemsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create miscItem',
    description: 'This creates a new miscItem record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'MiscItem created',
    type: MiscItemBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createMiscItemDto: CreateMiscItemDto) {
    return this.miscItemsService.create(createMiscItemDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all miscItem',
    description: 'This gets all miscItem records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all miscItem records',
    type: MiscItemEntity,
  })
  findAll() {
    return this.miscItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get miscItem by id',
    description: 'This gets one miscItem by its id',
  })
  @ApiOkResponse({ description: 'Found miscItem record', type: MiscItemEntity })
  @ApiNotFoundResponse({ description: 'MiscItem not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.miscItemsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update miscItem',
    description: 'This updates an miscItem record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated miscItem record',
    type: MiscItemBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'MiscItem not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateMiscItemDto: UpdateMiscItemDto,
  ) {
    return this.miscItemsService.update(id, updateMiscItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete miscItem',
    description: 'This deletes an miscItem record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'MiscItem was deleted',
    type: MiscItemBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'MiscItem not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.miscItemsService.remove(id);
  }
}
