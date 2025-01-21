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

@Controller('quests')
export class QuestsController {
  constructor(private readonly QuestsService: QuestsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create quest',
    description: 'This creates a new quest record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Quest created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createQuestDto: CreateQuestDto) {
    return this.QuestsService.create(createQuestDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all quest',
    description: 'This gets all quest records',
  })
  @ApiOkResponse({ description: 'Found all quest records' })
  findAll() {
    return this.QuestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get quest by id',
    description: 'This gets one quest by its id',
  })
  @ApiOkResponse({ description: 'Found quest record' })
  @ApiNotFoundResponse({ description: 'Quest not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.QuestsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update quest',
    description: 'This updates an quest record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Quest not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateQuestDto: UpdateQuestDto,
  ) {
    return this.QuestsService.update(id, updateQuestDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete quest',
    description: 'This deletes an quest record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Quest was deleted' })
  @ApiNotFoundResponse({ description: 'Quest not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.QuestsService.remove(id);
  }
}
