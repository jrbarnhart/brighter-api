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

@Module({
  controllers: [
    GatheringSkillRequirementsController,
    GatheringSkillsController,
    CraftingSkillRequirementsController,
    CraftingSkillsController,
  ],
  providers: [
    PrismaService,
    GatheringSkillRequirementsService,
    GatheringSkillsService,
    CraftingSkillRequirementsService,
    CraftingSkillsService,
  ],
})
export class SkillsModule {}
