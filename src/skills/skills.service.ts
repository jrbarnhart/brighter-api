/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class SkillsService {
  //Skills
  findAllSkills() {
    return `This action returns all skills`;
  }

  // Combat Skills
  createCombatSkill(createCombatSkillDto: CreateCombatSkillDto) {
    return 'This action adds a new combat skill';
  }

  findAllCombatSkills() {
    return `This action returns all combat skills`;
  }

  findOneCombatSkill(id: number) {
    return `This action returns a #${id} combat skill`;
  }

  updateCombatSkill(id: number, updateCombatSkillDto: UpdateCombatSkillDto) {
    return `This action updates a #${id} combat skill`;
  }

  removeCombatSkill(id: number) {
    return `This action removes a #${id} combat skill`;
  }

  // Combat Skill Requirements
  createCombatSkillRequirement(
    createCombatSkillRequirementDto: CreateCombatSkillRequirementDto,
  ) {
    return 'This action adds a new combat skill requirement';
  }

  findAllCombatSkillRequirements() {
    return `This action returns all combat skill requirements`;
  }

  findOneCombatSkillRequirement(id: number) {
    return `This action returns a #${id} combat skill requirement`;
  }

  updateCombatSkillRequirement(
    id: number,
    updateCombatSkillRequirementDto: UpdateCombatSkillRequirementDto,
  ) {
    return `This action updates a #${id} combat skill requirement`;
  }

  removeCombatSkillRequirement(id: number) {
    return `This action removes a #${id} combat skill requirement`;
  }

  // Gathering Skills
  createGatheringSkill(createGatheringSkillDto: CreateGatheringSkillDto) {
    return 'This action adds a new gathering skill';
  }

  findAllGatheringSkills() {
    return `This action returns all gathering skills`;
  }

  findOneGatheringSkill(id: number) {
    return `This action returns a #${id} gathering skill`;
  }

  updateGatheringSkill(
    id: number,
    updateGatheringSkillDto: UpdateGatheringSkillDto,
  ) {
    return `This action updates a #${id} gathering skill`;
  }

  removeGatheringSkill(id: number) {
    return `This action removes a #${id} gathering skill`;
  }

  // Gathering Skill Requirements
  createGatheringSkillRequirement(
    createGatheringSkillRequirementDto: CreateGatheringSkillRequirementDto,
  ) {
    return 'This action adds a new gathering skill requirement';
  }

  findAllGatheringSkillRequirements() {
    return `This action returns all gathering skill requirements`;
  }

  findOneGatheringSkillRequirement(id: number) {
    return `This action returns a #${id} gathering skill requirement`;
  }

  updateGatheringSkillRequirement(
    id: number,
    updateGatheringSkillRequirementDto: UpdateGatheringSkillRequirementDto,
  ) {
    return `This action updates a #${id} gathering skill requirement`;
  }

  removeGatheringSkillRequirement(id: number) {
    return `This action removes a #${id} gathering skill requirement`;
  }

  // Crafting Skills
  createCraftingSkill(createCraftingSkillDto: CreateCraftingSkillDto) {
    return 'This action adds a new crafting skill';
  }

  findAllCraftingSkills() {
    return `This action returns all crafting skills`;
  }

  findOneCraftingSkill(id: number) {
    return `This action returns a #${id} crafting skill`;
  }

  updateCraftingSkill(
    id: number,
    updateCraftingSkillDto: UpdateCraftingSkillDto,
  ) {
    return `This action updates a #${id} crafting skill`;
  }

  removeCraftingSkill(id: number) {
    return `This action removes a #${id} crafting skill`;
  }

  // Crafting Skill Requirements
  createCraftingSkillRequirement(
    createCraftingSkillRequirementDto: CreateCraftingSkillRequirementDto,
  ) {
    return 'This action adds a new crafting skill requirement';
  }

  findAllCraftingSkillRequirements() {
    return `This action returns all crafting skill requirements`;
  }

  findOneCraftingSkillRequirement(id: number) {
    return `This action returns a #${id} crafting skill requirement`;
  }

  updateCraftingSkillRequirement(
    id: number,
    updateCraftingSkillRequirementDto: UpdateCraftingSkillRequirementDto,
  ) {
    return `This action updates a #${id} crafting skill requirement`;
  }

  removeCraftingSkillRequirement(id: number) {
    return `This action removes a #${id} crafting skill requirement`;
  }
}
