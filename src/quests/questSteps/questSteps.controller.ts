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
import { QuestStepsService } from './questSteps.service';
import { CreateQuestStepDto } from './dto/create-questStep.dto';
import { UpdateQuestStepDto } from './dto/update-questStep.dto';
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
  QuestStepEntity,
  QuestStepBaseEntity,
} from './entities/questSteps.entity';

@Controller('quests/steps')
export class QuestStepsController {
  constructor(private readonly questStepsService: QuestStepsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create questStep',
    description: 'This creates a new questStep record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'QuestStep created',
    type: QuestStepBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createQuestStepDto: CreateQuestStepDto) {
    return this.questStepsService.create(createQuestStepDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all questStep',
    description: 'This gets all questStep records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all questStep records',
    type: QuestStepEntity,
  })
  findAll() {
    return this.questStepsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get questStep by id',
    description: 'This gets one questStep by its id',
  })
  @ApiOkResponse({
    description: 'Found questStep record',
    type: QuestStepEntity,
  })
  @ApiNotFoundResponse({ description: 'QuestStep not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questStepsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update questStep',
    description: 'This updates an questStep record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated questStep record',
    type: QuestStepBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'QuestStep not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateQuestStepDto: UpdateQuestStepDto,
  ) {
    return this.questStepsService.update(id, updateQuestStepDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete questStep',
    description: 'This deletes an questStep record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'QuestStep was deleted',
    type: QuestStepBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'QuestStep not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questStepsService.remove(id);
  }
}
