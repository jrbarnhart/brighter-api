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
import { CombatSkillsService } from './combatSkills.service';
import {
  CreateCombatSkillDto,
  createCombatSkillSchema,
} from './dto/create-combatSkill.dto';
import {
  UpdateCombatSkillDto,
  updateCombatSkillSchema,
} from './dto/update-combatSkill.dto';

@Controller('skills/combat')
export class CombatSkillsController {
  constructor(private readonly combatSkillsService: CombatSkillsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createCombatSkillSchema))
  create(@Body() createCombatSkillDto: CreateCombatSkillDto) {
    return this.combatSkillsService.create(createCombatSkillDto);
  }

  @Get()
  findAll() {
    return this.combatSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCombatSkillSchema))
    updateCombatSkillDto: UpdateCombatSkillDto,
  ) {
    return this.combatSkillsService.update(id, updateCombatSkillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.combatSkillsService.remove(id);
  }
}
