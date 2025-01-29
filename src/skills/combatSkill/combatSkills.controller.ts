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
import { CombatSkillsService } from './combatSkills.service';
import { CreateCombatSkillDto } from './dto/create-combatSkill.dto';
import { UpdateCombatSkillDto } from './dto/update-combatSkill.dto';
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
  CombatSkillEntity,
  CombatSkillBaseEntity,
} from './entities/combatSkills.entity';

@Controller('skills/combat')
export class CombatSkillsController {
  constructor(private readonly combatSkillsService: CombatSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create combatSkill',
    description: 'This creates a new combatSkill record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'CombatSkill created',
    type: CombatSkillBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createCombatSkillDto: CreateCombatSkillDto) {
    return this.combatSkillsService.create(createCombatSkillDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all combatSkill',
    description: 'This gets all combatSkill records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all combatSkill records',
    type: CombatSkillEntity,
  })
  findAll() {
    return this.combatSkillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get combatSkill by id',
    description: 'This gets one combatSkill by its id',
  })
  @ApiOkResponse({
    description: 'Found combatSkill record',
    type: CombatSkillEntity,
  })
  @ApiNotFoundResponse({ description: 'CombatSkill not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update combatSkill',
    description: 'This updates an combatSkill record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated combatSkill record',
    type: CombatSkillBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CombatSkill not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCombatSkillDto: UpdateCombatSkillDto,
  ) {
    return this.combatSkillsService.update(id, updateCombatSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete combatSkill',
    description: 'This deletes an combatSkill record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'CombatSkill was deleted',
    type: CombatSkillBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CombatSkill not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillsService.remove(id);
  }
}
