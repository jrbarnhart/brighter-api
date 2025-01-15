import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, createRoomSchema } from './dto/create-room.dto';
import { UpdateRoomDto, updateRoomSchema } from './dto/update-room.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createRoomSchema))
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateRoomSchema)) updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.remove(+id);
  }
}
