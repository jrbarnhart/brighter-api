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
import { GatheringSkillRequirementsService } from './gatheringSkillRequirements.service';
import { CreateGatheringSkillRequirementDto } from './dto/create-gatheringSkillRequirement.dto';
import { UpdateGatheringSkillRequirementDto } from './dto/update-gatheringSkillRequirement.dto';
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
  GatheringSkillRequirementEntity,
  GatheringSkillRequirementBaseEntity,
} from './entities/gatheringSkillRequirements.entity';

@Controller('skills/gathering/requirements')
export class GatheringSkillRequirementsController {
  constructor(
    private readonly gatheringSkillRequirementsService: GatheringSkillRequirementsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create gatheringSkillRequirement',
    description: 'This creates a new gatheringSkillRequirement record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'GatheringSkillRequirement created',
    type: GatheringSkillRequirementBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(
    @Body()
    createGatheringSkillRequirementDto: CreateGatheringSkillRequirementDto,
  ) {
    return this.gatheringSkillRequirementsService.create(
      createGatheringSkillRequirementDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all gatheringSkillRequirement',
    description: 'This gets all gatheringSkillRequirement records',
  })
  @ApiOkResponse({
    isArray: true,
    description: 'Found all gatheringSkillRequirement records',
    type: GatheringSkillRequirementEntity,
  })
  findAll() {
    return this.gatheringSkillRequirementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get gatheringSkillRequirement by id',
    description: 'This gets one gatheringSkillRequirement by its id',
  })
  @ApiOkResponse({
    description: 'Found gatheringSkillRequirement record',
    type: GatheringSkillRequirementEntity,
  })
  @ApiNotFoundResponse({ description: 'GatheringSkillRequirement not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillRequirementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update gatheringSkillRequirement',
    description: 'This updates an gatheringSkillRequirement record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated gatheringSkillRequirement record',
    type: GatheringSkillRequirementBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'GatheringSkillRequirement not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateGatheringSkillRequirementDto: UpdateGatheringSkillRequirementDto,
  ) {
    return this.gatheringSkillRequirementsService.update(
      id,
      updateGatheringSkillRequirementDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete gatheringSkillRequirement',
    description: 'This deletes an gatheringSkillRequirement record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'GatheringSkillRequirement was deleted',
    type: GatheringSkillRequirementBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'GatheringSkillRequirement not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillRequirementsService.remove(id);
  }
}
