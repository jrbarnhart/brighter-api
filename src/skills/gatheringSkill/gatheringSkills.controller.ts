import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ZodValidationPipe } from 'src/validation/zodValidation.pipe';
import { GatheringSkillsService } from './gatheringSkills.service';
import {
  CreateGatheringSkillDto,
  createGatheringSkillSchema,
} from './dto/create-gatheringSkill.dto';
import {
  UpdateGatheringSkillDto,
  updateGatheringSkillSchema,
} from './dto/update-gatheringSkill.dto';

@Controller('skills/gathering')
export class GatheringSkillsController {
  constructor(
    private readonly gatheringSkillsService: GatheringSkillsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createGatheringSkillSchema))
  create(@Body() createGatheringSkillDto: CreateGatheringSkillDto) {
    return this.gatheringSkillsService.create(createGatheringSkillDto);
  }

  @Get()
  findAll() {
    return this.gatheringSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateGatheringSkillSchema))
    updateGatheringSkillDto: UpdateGatheringSkillDto,
  ) {
    return this.gatheringSkillsService.update(id, updateGatheringSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillsService.remove(id);
  }
}
