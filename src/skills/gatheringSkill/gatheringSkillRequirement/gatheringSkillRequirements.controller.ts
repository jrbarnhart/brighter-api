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
import { GatheringSkillRequirementsService } from './gatheringSkillRequirements.service';
import {
  CreateGatheringSkillRequirementDto,
  createGatheringSkillRequirementSchema,
} from './dto/create-gatheringSkillRequirement.dto';
import {
  UpdateGatheringSkillRequirementDto,
  updateGatheringSkillRequirementSchema,
} from './dto/update-gatheringSkillRequirement.dto';

@Controller('/skills/gathering/requirements')
export class GatheringSkillRequirementsController {
  constructor(
    private readonly gatheringSkillRequirementsService: GatheringSkillRequirementsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createGatheringSkillRequirementSchema))
  create(
    @Body()
    createGatheringSkillRequirementDto: CreateGatheringSkillRequirementDto,
  ) {
    return this.gatheringSkillRequirementsService.create(
      createGatheringSkillRequirementDto,
    );
  }

  @Get()
  findAll() {
    return this.gatheringSkillRequirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillRequirementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateGatheringSkillRequirementSchema))
    updateGatheringSkillRequirementDto: UpdateGatheringSkillRequirementDto,
  ) {
    return this.gatheringSkillRequirementsService.update(
      id,
      updateGatheringSkillRequirementDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gatheringSkillRequirementsService.remove(id);
  }
}
