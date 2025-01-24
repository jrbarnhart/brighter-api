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
import { CraftingSkillRequirementsService } from './craftingSkillRequirements.service';
import { CreateCraftingSkillRequirementDto } from './dto/create-craftingSkillRequirement.dto';
import { UpdateCraftingSkillRequirementDto } from './dto/update-craftingSkillRequirement.dto';
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
  CraftingSkillRequirementEntity,
  CraftingSkillRequirementBaseEntity,
} from './entities/craftingSkillRequirements.entity';

@Controller('craftingSkillRequirements')
export class CraftingSkillRequirementsController {
  constructor(
    private readonly craftingSkillRequirementsService: CraftingSkillRequirementsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create craftingSkillRequirement',
    description: 'This creates a new craftingSkillRequirement record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'CraftingSkillRequirement created',
    type: CraftingSkillRequirementBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(
    @Body()
    createCraftingSkillRequirementDto: CreateCraftingSkillRequirementDto,
  ) {
    return this.craftingSkillRequirementsService.create(
      createCraftingSkillRequirementDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all craftingSkillRequirement',
    description: 'This gets all craftingSkillRequirement records',
  })
  @ApiOkResponse({
    description: 'Found all craftingSkillRequirement records',
    type: CraftingSkillRequirementEntity,
  })
  findAll() {
    return this.craftingSkillRequirementsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get craftingSkillRequirement by id',
    description: 'This gets one craftingSkillRequirement by its id',
  })
  @ApiOkResponse({
    description: 'Found craftingSkillRequirement record',
    type: CraftingSkillRequirementEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingSkillRequirement not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillRequirementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update craftingSkillRequirement',
    description: 'This updates an craftingSkillRequirement record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated craftingSkillRequirement record',
    type: CraftingSkillRequirementBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingSkillRequirement not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCraftingSkillRequirementDto: UpdateCraftingSkillRequirementDto,
  ) {
    return this.craftingSkillRequirementsService.update(
      id,
      updateCraftingSkillRequirementDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete craftingSkillRequirement',
    description: 'This deletes an craftingSkillRequirement record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'CraftingSkillRequirement was deleted',
    type: CraftingSkillRequirementBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingSkillRequirement not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillRequirementsService.remove(id);
  }
}
