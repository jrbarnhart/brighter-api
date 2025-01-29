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
import { QuestsService } from './quests.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QuestEntity, QuestBaseEntity } from './entities/quests.entity';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create quest',
    description: 'This creates a new quest record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Quest created', type: QuestBaseEntity })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.questsService.create(createQuestDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all quest',
    description: 'This gets all quest records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all quest records',
    type: QuestEntity,
  })
  findAll() {
    return this.questsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get quest by id',
    description: 'This gets one quest by its id',
  })
  @ApiOkResponse({ description: 'Found quest record', type: QuestEntity })
  @ApiNotFoundResponse({ description: 'Quest not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update quest',
    description: 'This updates an quest record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Updated quest record', type: QuestBaseEntity })
  @ApiNotFoundResponse({ description: 'Quest not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateQuestDto: UpdateQuestDto,
  ) {
    return this.questsService.update(id, updateQuestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete quest',
    description: 'This deletes an quest record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Quest was deleted', type: QuestBaseEntity })
  @ApiNotFoundResponse({ description: 'Quest not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questsService.remove(id);
  }
}
