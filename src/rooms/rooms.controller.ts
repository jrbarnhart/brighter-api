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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoomEntity, RoomBaseEntity } from './entities/rooms.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create room',
    description: 'This creates a new room record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Room created', type: RoomBaseEntity })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all room',
    description: 'This gets all room records',
  })
  @ApiOkResponse({
    description: 'Found all room records',
    type: RoomEntity,
    isArray: true,
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get room by id',
    description: 'This gets one room by its id',
  })
  @ApiOkResponse({ description: 'Found room record', type: RoomEntity })
  @ApiNotFoundResponse({ description: 'Room not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update room',
    description: 'This updates an room record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated room record', type: RoomBaseEntity })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete room',
    description: 'This deletes an room record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Room was deleted', type: RoomBaseEntity })
  @ApiNotFoundResponse({ description: 'Room not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.remove(id);
  }
}
