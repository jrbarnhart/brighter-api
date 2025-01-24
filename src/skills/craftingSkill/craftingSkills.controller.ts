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
import { CraftingSkillsService } from './craftingSkills.service';
import { CreateCraftingSkillDto } from './dto/create-craftingSkill.dto';
import { UpdateCraftingSkillDto } from './dto/update-craftingSkill.dto';
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
  CraftingSkillEntity,
  CraftingSkillBaseEntity,
} from './entities/craftingSkills.entity';

@Controller('skills/crafting')
export class CraftingSkillsController {
  constructor(private readonly craftingSkillsService: CraftingSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create craftingSkill',
    description: 'This creates a new craftingSkill record',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'CraftingSkill created',
    type: CraftingSkillBaseEntity,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  create(@Body() createCraftingSkillDto: CreateCraftingSkillDto) {
    return this.craftingSkillsService.create(createCraftingSkillDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all craftingSkill',
    description: 'This gets all craftingSkill records',
  })
  @ApiOkResponse({
    description: 'Found all craftingSkill records',
    type: CraftingSkillEntity,
  })
  findAll() {
    return this.craftingSkillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get craftingSkill by id',
    description: 'This gets one craftingSkill by its id',
  })
  @ApiOkResponse({
    description: 'Found craftingSkill record',
    type: CraftingSkillEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingSkill not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update craftingSkill',
    description: 'This updates an craftingSkill record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Updated craftingSkill record',
    type: CraftingSkillBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingSkill not found' })
  @ApiBadRequestResponse({ description: 'Bad request, invalid body data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateCraftingSkillDto: UpdateCraftingSkillDto,
  ) {
    return this.craftingSkillsService.update(id, updateCraftingSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete craftingSkill',
    description: 'This deletes an craftingSkill record by id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'CraftingSkill was deleted',
    type: CraftingSkillBaseEntity,
  })
  @ApiNotFoundResponse({ description: 'CraftingSkill not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.craftingSkillsService.remove(id);
  }
}
