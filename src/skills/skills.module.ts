import { Module } from '@nestjs/common';
import { GatheringSkillsController } from './gatheringSkill/gatheringSkills.controller';
import { GatheringSkillRequirementsController } from './gatheringSkill/gatheringSkillRequirement/gatheringSkillRequirements.controller';
import { PrismaService } from 'src/prisma.service';
import { GatheringSkillRequirementsService } from './gatheringSkill/gatheringSkillRequirement/gatheringSkillRequirements.service';
import { GatheringSkillsService } from './gatheringSkill/gatheringSkills.service';
import { CraftingSkillRequirementsController } from './craftingSkill/craftingSkillRequirement/craftingSkillRequirements.controller';
import { CraftingSkillsController } from './craftingSkill/craftingSkills.controller';
import { CraftingSkillsService } from './craftingSkill/craftingSkills.service';
import { CraftingSkillRequirementsService } from './craftingSkill/craftingSkillRequirement/craftingSkillRequirements.service';
import { CombatSkillRequirementsController } from './combatSkill/combatSkillRequirement/combatSkillRequirements.controller';
import { CombatSkillsController } from './combatSkill/combatSkills.controller';
import { CombatSkillRequirementsService } from './combatSkill/combatSkillRequirement/combatSkillRequirements.service';
import { CombatSkillsService } from './combatSkill/combatSkills.service';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  controllers: [
    GatheringSkillRequirementsController,
    GatheringSkillsController,
    CraftingSkillRequirementsController,
    CraftingSkillsController,
    CombatSkillRequirementsController,
    CombatSkillsController,
    SkillsController,
  ],
  providers: [
    PrismaService,
    GatheringSkillRequirementsService,
    GatheringSkillsService,
    CraftingSkillRequirementsService,
    CraftingSkillsService,
    CombatSkillRequirementsService,
    CombatSkillsService,
    SkillsService,
  ],
})
export class SkillsModule {}
