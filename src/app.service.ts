import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMetadata() {
    return {
      name: 'Brighter Shores API',
      version: '1.0.0',
      description:
        'An API for the Brighter Shores MMO, providing data on regions, rooms, skills, monsters, items, quests, and npcs.',
      endpoints: {
        stats: '/stats',
        regions: '/regions',
        rooms: '/rooms',
        combatSkills: '/skills/combat',
        combatSkillRequirements: '/skills/combat/requirements',
        gatheringSkills: '/skills/gathering',
        gatheringSkillRequirements: '/skills/gathering/requirements',
        craftingSkills: '/skills/crafting',
        craftingSkillRequirements: '/skills/crafting/requirements',
        craftingRecipes: '/skills/crafting/recipes',
        resources: '/items/resources',
        resourceVariants: 'items/resources/variants',
        consumables: '/items/consumables',
        consumableVariants: 'items/consumables/variants',
        weapons: '/items/weapons',
        weaponVariants: 'items/weapons/variants',
        armors: '/items/armors',
        armorVariants: '/items/armors/variants',
        miscItems: '/items/misc',
        monsters: '/monsters',
        monsterVariants: '/monsters/variants',
        dropTables: '/monsters/drop-tables',
        npcs: '/npcs',
        vendors: '/npcs/vendors',
        quests: '/quests',
        questSteps: '/quests/steps',
      },
    };
  }
}
