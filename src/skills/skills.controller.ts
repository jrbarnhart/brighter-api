import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateCombatSkillDto } from './dto/combatSkill/create-combat-skill.dto';
import { UpdateCombatSkillDto } from './dto/combatSkill/update-combat-skill.dto';
import { CreateCombatSkillRequirementDto } from './dto/combatSkill/create-combat-skill-requirement.dto';
import { UpdateCombatSkillRequirementDto } from './dto/combatSkill/update-combat-skill-requirement.dto';
import { CreateGatheringSkillDto } from './dto/gatheringSkill/create-gathering-skill.dto';
import { UpdateGatheringSkillDto } from './dto/gatheringSkill/update-gathering-skill.dto';
import { CreateGatheringSkillRequirementDto } from './dto/gatheringSkill/create-gathering-skill-requirement.dto';
import { UpdateGatheringSkillRequirementDto } from './dto/gatheringSkill/update-gathering-skill-requirement.dto';
import { CreateCraftingSkillDto } from './dto/craftingSkill/create-crafting-skill.dto';
import { UpdateCraftingSkillDto } from './dto/craftingSkill/update-crafting-skill.dto';
import { CreateCraftingSkillRequirementDto } from './dto/craftingSkill/create-crafting-skill-requirement.dto';
import { UpdateCraftingSkillRequirementDto } from './dto/craftingSkill/update-crafting-skill-requirement.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  // All skills
  @Get()
  findAllSkills() {
    return this.skillsService.findAllSkills();
  }

  // Combat Skills
  @Post('combat')
  createCombatSkill(@Body() createCombatSkillDto: CreateCombatSkillDto) {
    return this.skillsService.createCombatSkill(createCombatSkillDto);
  }

  @Get('combat')
  findAllCombatSkills() {
    return this.skillsService.findAllCombatSkills();
  }

  @Get('combat/:id')
  findOneCombatSkill(@Param('id') id: string) {
    return this.skillsService.findOneCombatSkill(+id);
  }

  @Patch('combat/:id')
  updateCombatSkill(
    @Param('id') id: string,
    @Body() updateCombatSkillDto: UpdateCombatSkillDto,
  ) {
    return this.skillsService.updateCombatSkill(+id, updateCombatSkillDto);
  }

  @Delete('combat/:id')
  removeCombatSkill(@Param('id') id: string) {
    return this.skillsService.removeCombatSkill(+id);
  }

  // Combat Skill Requirements
  @Post('combat/requirements')
  createCombatSkillRequirement(
    @Body() createCombatSkillRequirementDto: CreateCombatSkillRequirementDto,
  ) {
    return this.skillsService.createCombatSkillRequirement(
      createCombatSkillRequirementDto,
    );
  }

  @Get('combat/requirements')
  findAllCombatSkillRequirements() {
    return this.skillsService.findAllCombatSkillRequirements();
  }

  @Get('combat/requirements/:id')
  findOneCombatSkillRequirement(@Param('id') id: string) {
    return this.skillsService.findOneCombatSkillRequirement(+id);
  }

  @Patch('combat/requirements/:id')
  updateCombatSkillRequirement(
    @Param('id') id: string,
    @Body() updateCombatSkillRequirementDto: UpdateCombatSkillRequirementDto,
  ) {
    return this.skillsService.updateCombatSkillRequirement(
      +id,
      updateCombatSkillRequirementDto,
    );
  }

  @Delete('combat/requirements/:id')
  removeCombatSkillRequirement(@Param('id') id: string) {
    return this.skillsService.removeCombatSkillRequirement(+id);
  }

  // Gathering Skills
  @Post('gathering')
  createGatheringSkill(
    @Body() createGatheringSkillDto: CreateGatheringSkillDto,
  ) {
    return this.skillsService.createGatheringSkill(createGatheringSkillDto);
  }

  @Get('gathering')
  findAllGatheringSkills() {
    return this.skillsService.findAllGatheringSkills();
  }

  @Get('gathering/:id')
  findOneGatheringSkill(@Param('id') id: string) {
    return this.skillsService.findOneGatheringSkill(+id);
  }

  @Patch('gathering/:id')
  updateGatheringSkill(
    @Param('id') id: string,
    @Body() updateGatheringSkillDto: UpdateGatheringSkillDto,
  ) {
    return this.skillsService.updateGatheringSkill(
      +id,
      updateGatheringSkillDto,
    );
  }

  @Delete('gathering/:id')
  removeGatheringSkill(@Param('id') id: string) {
    return this.skillsService.removeGatheringSkill(+id);
  }

  // Gathering Skill Requirements
  @Post('gathering/requirements')
  createGatheringSkillRequirement(
    @Body()
    createGatheringSkillRequirementDto: CreateGatheringSkillRequirementDto,
  ) {
    return this.skillsService.createGatheringSkillRequirement(
      createGatheringSkillRequirementDto,
    );
  }

  @Get('gathering/requirements')
  findAllGatheringSkillRequirements() {
    return this.skillsService.findAllGatheringSkillRequirements();
  }

  @Get('gathering/requirements/:id')
  findOneGatheringSkillRequirement(@Param('id') id: string) {
    return this.skillsService.findOneGatheringSkillRequirement(+id);
  }

  @Patch('gathering/requirements/:id')
  updateGatheringSkillRequirement(
    @Param('id') id: string,
    @Body()
    updateGatheringSkillRequirementDto: UpdateGatheringSkillRequirementDto,
  ) {
    return this.skillsService.updateGatheringSkillRequirement(
      +id,
      updateGatheringSkillRequirementDto,
    );
  }

  @Delete('gathering/requirements/:id')
  removeGatheringSkillRequirement(@Param('id') id: string) {
    return this.skillsService.removeGatheringSkillRequirement(+id);
  }

  // Crafting Skills
  @Post('crafting')
  createCraftingSkill(@Body() createCraftingSkillDto: CreateCraftingSkillDto) {
    return this.skillsService.createCraftingSkill(createCraftingSkillDto);
  }

  @Get('crafting')
  findAllCraftingSkills() {
    return this.skillsService.findAllCraftingSkills();
  }

  @Get('crafting/:id')
  findOneCraftingSkill(@Param('id') id: string) {
    return this.skillsService.findOneCraftingSkill(+id);
  }

  @Patch('crafting/:id')
  updateCraftingSkill(
    @Param('id') id: string,
    @Body() updateCraftingSkillDto: UpdateCraftingSkillDto,
  ) {
    return this.skillsService.updateCraftingSkill(+id, updateCraftingSkillDto);
  }

  @Delete('crafting/:id')
  removeCraftingSkill(@Param('id') id: string) {
    return this.skillsService.removeCraftingSkill(+id);
  }

  // Crafting Skill Requirements
  @Post('crafting/requirements')
  createCraftingSkillRequirement(
    @Body()
    createCraftingSkillRequirementDto: CreateCraftingSkillRequirementDto,
  ) {
    return this.skillsService.createCraftingSkillRequirement(
      createCraftingSkillRequirementDto,
    );
  }

  @Get('crafting/requirements')
  findAllCraftingSkillRequirements() {
    return this.skillsService.findAllCraftingSkillRequirements();
  }

  @Get('crafting/requirements/:id')
  findOneCraftingSkillRequirement(@Param('id') id: string) {
    return this.skillsService.findOneCraftingSkillRequirement(+id);
  }

  @Patch('crafting/requirements/:id')
  updateCraftingSkillRequirement(
    @Param('id') id: string,
    @Body()
    updateCraftingSkillRequirementDto: UpdateCraftingSkillRequirementDto,
  ) {
    return this.skillsService.updateCraftingSkillRequirement(
      +id,
      updateCraftingSkillRequirementDto,
    );
  }

  @Delete('crafting/requirements/:id')
  removeCraftingSkillRequirement(@Param('id') id: string) {
    return this.skillsService.removeCraftingSkillRequirement(+id);
  }
}
