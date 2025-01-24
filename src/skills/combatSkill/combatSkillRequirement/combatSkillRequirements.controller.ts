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
import { CombatSkillRequirementsService } from './combatSkillRequirements.service';
import { CreateCombatSkillRequirementDto } from './dto/create-combatSkillRequirement.dto';
import { UpdateCombatSkillRequirementDto } from './dto/update-combatSkillRequirement.dto';
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
  CombatSkillRequirementEntity,
  CombatSkillRequirementBaseEntity,
} from './entities/combatSkillRequirements.entity';

@Controller('skills/combat/requirements')
export class CombatSkillRequirementsController {
  constructor(
    private readonly combatSkillRequirementsService: CombatSkillRequirementsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create combatSkillRequirement',
    description: 'This creates a new combatSkillRequirement record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'CombatSkillRequirement created',
    type: CombatSkillRequirementBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(
    @Body() createCombatSkillRequirementDto: CreateCombatSkillRequirementDto,
  ) {
    return this.combatSkillRequirementsService.create(
      createCombatSkillRequirementDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all combatSkillRequirement',
    description: 'This gets all combatSkillRequirement records',
  })
  @ApiOkResponse({
    description: 'Found all combatSkillRequirement records',
    type: CombatSkillRequirementEntity,
  })
  findAll() {
    return this.combatSkillRequirementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get combatSkillRequirement by id',
    description: 'This gets one combatSkillRequirement by its id',
  })
  @ApiOkResponse({
    description: 'Found combatSkillRequirement record',
    type: CombatSkillRequirementEntity,
  })
  @ApiNotFoundResponse({ description: 'CombatSkillRequirement not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillRequirementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update combatSkillRequirement',
    description: 'This updates an combatSkillRequirement record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated combatSkillRequirement record',
    type: CombatSkillRequirementBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CombatSkillRequirement not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCombatSkillRequirementDto: UpdateCombatSkillRequirementDto,
  ) {
    return this.combatSkillRequirementsService.update(
      id,
      updateCombatSkillRequirementDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete combatSkillRequirement',
    description: 'This deletes an combatSkillRequirement record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'CombatSkillRequirement was deleted',
    type: CombatSkillRequirementBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CombatSkillRequirement not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillRequirementsService.remove(id);
  }
}
