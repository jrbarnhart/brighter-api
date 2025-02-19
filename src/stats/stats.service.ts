import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StatsEntity } from './entities/stats.entity';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async get(): Promise<StatsEntity> {
    const [
      regions,
      rooms,
      combatSkills,
      combatSkillRequirements,
      gatheringSkills,
      gatheringSkillRequirements,
      craftingSkills,
      craftingSkillRequirements,
      craftingRecipes,
      resources,
      resourceVariants,
      consumables,
      consumableVariants,
      weapons,
      weaponVariants,
      armors,
      armorVariants,
      miscItems,
      monsters,
      monsterVariants,
      npcs,
      vendors,
      quests,
      questSteps,
    ] = await Promise.all([
      this.prisma.region.count(),
      this.prisma.room.count(),
      this.prisma.combatSkill.count(),
      this.prisma.combatSkillRequirement.count(),
      this.prisma.gatheringSkill.count(),
      this.prisma.gatheringSkillRequirement.count(),
      this.prisma.craftingSkill.count(),
      this.prisma.craftingSkillRequirement.count(),
      this.prisma.craftingRecipe.count(),
      this.prisma.resource.count(),
      this.prisma.resourceVariant.count(),
      this.prisma.consumable.count(),
      this.prisma.consumableVariant.count(),
      this.prisma.weapon.count(),
      this.prisma.weaponVariant.count(),
      this.prisma.armor.count(),
      this.prisma.armorVariant.count(),
      this.prisma.miscItem.count(),
      this.prisma.monster.count(),
      this.prisma.monsterVariant.count(),
      this.prisma.nPC.count(),
      this.prisma.vendor.count(),
      this.prisma.quest.count(),
      this.prisma.questStep.count(),
    ]);

    const [
      combatSkillRequirementsUnsetCount,
      gatheringSkillRequirementsUnsetCount,
      craftingSkillRequirementsUnsetCount,
      craftingRecipesUnsetCount,
      resourceVariantsUnsetCount,
      consumableVariantsUnsetCount,
      weaponVariantsUnsetCount,
      armorVariantsUnsetCount,
      monsterVariantsUnsetCount,
      dropTablesUnsetCount,
      npcsUnsetCount,
      vendorsUnsetCount,
      questsUnsetCount,
      questStepUnsetCount,
    ] = await Promise.all([
      this.prisma.combatSkillRequirement.count({
        where: {
          AND: [
            {
              OR: [
                { description: { equals: '' } },
                { description: { equals: undefined } },
              ],
            },
            { monsterVariantId: { equals: null } },
          ],
        },
      }),
      this.prisma.gatheringSkillRequirement.count({
        where: {
          AND: [
            {
              OR: [
                { description: { equals: '' } },
                { description: { equals: undefined } },
              ],
            },
            { resourceVariantId: { equals: null } },
          ],
        },
      }),
      this.prisma.craftingSkillRequirement.count({
        where: {
          AND: [
            {
              OR: [
                { description: { equals: '' } },
                { description: { equals: undefined } },
              ],
            },
            { recipeId: { equals: null } },
          ],
        },
      }),
      this.prisma.craftingRecipe.count({
        where: {
          OR: [
            {
              AND: [
                { inputResourceVariants: { none: {} } },
                { inputItems: { none: {} } },
              ],
            },
            {
              AND: [
                { outputConsumableVariantId: { equals: null } },
                { outputWeaponVariantId: { equals: null } },
                { outputArmorVariantId: { equals: null } },
              ],
            },
          ],
        },
      }),
      this.prisma.resourceVariant.count({
        where: {
          requirement: { is: null },
        },
      }),
      this.prisma.consumableVariant.count({
        where: {
          recipe: { is: null },
        },
      }),
      this.prisma.weaponVariant.count({
        where: {
          recipe: { is: null },
        },
      }),
      this.prisma.armorVariant.count({
        where: {
          recipe: { is: null },
        },
      }),
      this.prisma.monsterVariant.count({
        where: {
          requirement: { is: null },
        },
      }),
      this.prisma.dropTable.count({
        where: {
          OR: [
            {
              AND: [
                { currency: { equals: 0 } },
                { currency: { equals: null } },
              ],
            },
            {
              AND: [
                { resourceVariants: { none: {} } },
                { weaponVariants: { none: {} } },
                { armorVariants: { none: {} } },
                { consumableVariants: { none: {} } },
                { miscItems: { none: {} } },
              ],
            },
          ],
        },
      }),
      this.prisma.nPC.count({
        where: {
          rooms: { none: {} },
        },
      }),
      this.prisma.vendor.count({
        where: {
          AND: [
            { resourceVariants: { none: {} } },
            { consumableVariants: { none: {} } },
            { weaponVariants: { none: {} } },
            { armorVariants: { none: {} } },
            { miscItems: { none: {} } },
          ],
        },
      }),
      this.prisma.quest.count({
        where: {
          steps: { none: {} },
        },
      }),
      this.prisma.questStep.count({
        where: {
          AND: [
            { roomId: { equals: null } },
            { npcId: { equals: null } },
            {
              OR: [
                { description: { equals: '' } },
                { description: { equals: undefined } },
              ],
            },
          ],
        },
      }),
    ]);

    return {
      counts: {
        regions,
        rooms,
        combatSkills,
        combatSkillRequirements,
        gatheringSkills,
        gatheringSkillRequirements,
        craftingSkills,
        craftingSkillRequirements,
        craftingRecipes,
        resources,
        resourceVariants,
        consumables,
        consumableVariants,
        weapons,
        weaponVariants,
        armors,
        armorVariants,
        miscItems,
        monsters,
        monsterVariants,
        npcs,
        vendors,
        quests,
        questSteps,
      },
      unset: {
        combatSkillRequirements: combatSkillRequirementsUnsetCount,
        gatheringSkillRequirements: gatheringSkillRequirementsUnsetCount,
        craftingSkillRequirements: craftingSkillRequirementsUnsetCount,
        craftingRecipes: craftingRecipesUnsetCount,
        resourceVariants: resourceVariantsUnsetCount,
        consumableVariants: consumableVariantsUnsetCount,
        weaponVariants: weaponVariantsUnsetCount,
        armorVariants: armorVariantsUnsetCount,
        monsterVariants: monsterVariantsUnsetCount,
        dropTables: dropTablesUnsetCount,
        npcs: npcsUnsetCount,
        vendors: vendorsUnsetCount,
        quests: questsUnsetCount,
        questStep: questStepUnsetCount,
      },
    };
  }
}
