import { IsInt, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class StatsEntity {
  // Basic counts for all records

  @IsNotEmpty()
  @IsObject()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  counts: {
    regions: number;
    rooms: number;
    combatSkills: number;
    combatSkillRequirements: number;
    gatheringSkills: number;
    gatheringSkillRequirements: number;
    craftingSkills: number;
    craftingSkillRequirements: number;
    craftingRecipes: number;
    resources: number;
    resourceVariants: number;
    consumables: number;
    consumableVariants: number;
    weapons: number;
    weaponVariants: number;
    armors: number;
    armorVariants: number;
    miscItems: number;
    monsters: number;
    monsterVariants: number;
    npcs: number;
    vendors: number;
    quests: number;
    questSteps: number;
  };

  @IsNotEmpty()
  @IsObject()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  unset: {
    combatSkillRequirements: number; // No description or monsterVariantId
    gatheringSkillRequirements: number; // No description or resourceVariantId
    craftingSkillRequirements: number; // No description or recipeId
    craftingRecipes: number; // Missing at least one input and one output
    resourceVariants: number; // No requirement
    consumableVariants: number; // No recipe
    weaponVariants: number; // No recipe
    armorVariants: number; // No recipe
    monsterVariants: number; // No requirement
    dropTables: number; // No currency or item ids
    npcs: number; // No rooms
    vendors: number; // No item ids
    quests: number; // No steps
    questSteps: number; // Missing at least roomId or npcId
  };
}
