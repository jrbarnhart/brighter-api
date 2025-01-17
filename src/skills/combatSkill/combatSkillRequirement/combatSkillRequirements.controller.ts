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
import { CombatSkillRequirementsService } from './combatSkillRequirements.service';
import {
  CreateCombatSkillRequirementDto,
  createCombatSkillRequirementSchema,
} from './dto/create-combatSkillRequirement.dto';
import {
  UpdateCombatSkillRequirementDto,
  updateCombatSkillRequirementSchema,
} from './dto/update-combatSkillRequirement.dto';

@Controller('/skills/combat/requirements')
export class CombatSkillRequirementsController {
  constructor(
    private readonly combatSkillRequirementsService: CombatSkillRequirementsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createCombatSkillRequirementSchema))
  create(
    @Body() createCombatSkillRequirementDto: CreateCombatSkillRequirementDto,
  ) {
    return this.combatSkillRequirementsService.create(
      createCombatSkillRequirementDto,
    );
  }

  @Get()
  findAll() {
    return this.combatSkillRequirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillRequirementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCombatSkillRequirementSchema))
    updateCombatSkillRequirementDto: UpdateCombatSkillRequirementDto,
  ) {
    return this.combatSkillRequirementsService.update(
      id,
      updateCombatSkillRequirementDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillRequirementsService.remove(id);
  }
}
