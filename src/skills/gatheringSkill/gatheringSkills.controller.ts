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
import { GatheringSkillsService } from './gatheringSkills.service';
import { CreateGatheringSkillDto } from './dto/create-gatheringSkill.dto';
import { UpdateGatheringSkillDto } from './dto/update-gatheringSkill.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('skills/gathering')
export class GatheringSkillsController {
  constructor(
    private readonly gatheringSkillsService: GatheringSkillsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create gatheringSkill',
    description: 'This creates a new gatheringSkill record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'GatheringSkill created' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createGatheringSkillDto: CreateGatheringSkillDto) {
    return this.gatheringSkillsService.create(createGatheringSkillDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all gatheringSkill',
    description: 'This gets all gatheringSkill records',
  })
  @ApiOkResponse({ description: 'Found all gatheringSkill records' })
  findAll() {
    return this.gatheringSkillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gatheringSkill by id',
    description: 'This gets one gatheringSkill by its id',
  })
  @ApiOkResponse({ description: 'Found gatheringSkill record' })
  @ApiNotFoundResponse({ description: 'GatheringSkill not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update gatheringSkill',
    description: 'This updates an gatheringSkill record by id',
  })
  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'GatheringSkill not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateGatheringSkillDto: UpdateGatheringSkillDto,
  ) {
    return this.gatheringSkillsService.update(id, updateGatheringSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete gatheringSkill',
    description: 'This deletes an gatheringSkill record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'GatheringSkill was deleted' })
  @ApiNotFoundResponse({ description: 'GatheringSkill not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillsService.remove(id);
  }
}
