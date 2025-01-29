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
import { NpcsService } from './npcs.service';
import { CreateNpcDto } from './dto/create-npc.dto';
import { UpdateNpcDto } from './dto/update-npc.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NpcEntity, NpcBaseEntity } from './entities/npcs.entity';

@Controller('npcs')
export class NpcsController {
  constructor(private readonly npcsService: NpcsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create npc',
    description: 'This creates a new npc record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Npc created', type: NpcBaseEntity })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createNpcDto: CreateNpcDto) {
    return this.npcsService.create(createNpcDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all npc',
    description: 'This gets all npc records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all npc records',
    type: NpcEntity,
  })
  findAll() {
    return this.npcsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get npc by id',
    description: 'This gets one npc by its id',
  })
  @ApiOkResponse({ description: 'Found npc record', type: NpcEntity })
  @ApiNotFoundResponse({ description: 'Npc not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.npcsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update npc',
    description: 'This updates an npc record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated npc record', type: NpcBaseEntity })
  @ApiNotFoundResponse({ description: 'Npc not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateNpcDto: UpdateNpcDto,
  ) {
    return this.npcsService.update(id, updateNpcDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete npc',
    description: 'This deletes an npc record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Npc was deleted', type: NpcBaseEntity })
  @ApiNotFoundResponse({ description: 'Npc not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.npcsService.remove(id);
  }
}
