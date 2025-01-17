import { Module } from '@nestjs/common';
import { GatheringSkillsController } from './gatheringSkill/gatheringSkills.controller';
import { GatheringSkillRequirementsController } from './gatheringSkill/gatheringSkillRequirement/gatheringSkillRequirements.controller';
import { PrismaService } from 'src/prisma.service';
import { GatheringSkillRequirementsService } from './gatheringSkill/gatheringSkillRequirement/gatheringSkillRequirements.service';
import { GatheringSkillsService } from './gatheringSkill/gatheringSkills.service';

@Module({
  controllers: [
    GatheringSkillRequirementsController,
    GatheringSkillsController,
  ],
  providers: [
    PrismaService,
    GatheringSkillRequirementsService,
    GatheringSkillsService,
  ],
})
export class SkillsModule {}
