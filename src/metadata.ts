/* eslint-disable */
export default async () => {
    const t = {
        ["./regions/entities/regions.entity"]: await import("./regions/entities/regions.entity"),
        ["./rooms/entities/rooms.entity"]: await import("./rooms/entities/rooms.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./auth/dto/signIn.dto"), { "SignInDto": { username: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./regions/dto/create-region.dto"), { "CreateRegionDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./regions/dto/update-region.dto"), { "UpdateRegionDto": { name: { required: false, type: () => String, maxLength: 256 } } }], [import("./rooms/entities/rooms.entity"), { "RoomEntity": { id: { required: true, type: () => Number, minimum: 1 }, name: { required: true, type: () => String, maxLength: 256 }, region: { required: true, type: () => t["./regions/entities/regions.entity"].RegionEntity }, regionId: { required: true, type: () => Number, minimum: 1 }, portal: { required: true, type: () => Boolean }, obelisk: { required: true, type: () => Boolean }, banks: { required: false, type: () => [Object] } } }], [import("./regions/entities/regions.entity"), { "RegionEntity": { id: { required: true, type: () => Number, minimum: 1 }, name: { required: true, type: () => String, maxLength: 256 }, rooms: { required: true, type: () => [t["./rooms/entities/rooms.entity"].RoomEntity] } } }], [import("./rooms/dto/create-room.dto"), { "CreateRoomDto": { name: { required: true, type: () => String, maxLength: 256 }, regionId: { required: true, type: () => Number, minimum: 1 }, portal: { required: true, type: () => Boolean }, obelisk: { required: true, type: () => Boolean }, craftingSkillIds: { required: false, type: () => [Number], minimum: 1 }, monsterIds: { required: false, type: () => [Number], minimum: 1 }, npcIds: { required: false, type: () => [Number], minimum: 1 }, resourceIds: { required: false, type: () => [Number], minimum: 1 }, questStepIds: { required: false, type: () => [Number], minimum: 1 }, banks: { required: false, type: () => [Object] } } }], [import("./rooms/dto/update-room.dto"), { "UpdateRoomDto": { name: { required: false, type: () => String, maxLength: 256 }, regionId: { required: false, type: () => Number, minimum: 1 }, portal: { required: false, type: () => Boolean }, obelisk: { required: false, type: () => Boolean }, craftingSkillIds: { required: false, type: () => [Number], minimum: 1 }, monsterIds: { required: false, type: () => [Number], minimum: 1 }, npcIds: { required: false, type: () => [Number], minimum: 1 }, resourceIds: { required: false, type: () => [Number], minimum: 1 }, questStepIds: { required: false, type: () => [Number], minimum: 1 }, banks: { required: false, type: () => [Object] } } }], [import("./skills/gatheringSkill/dto/create-gatheringSkill.dto"), { "CreateGatheringSkillDto": { name: { required: true, type: () => String, maxLength: 256 }, regionId: { required: true, type: () => Number, minimum: 1 } } }], [import("./skills/gatheringSkill/dto/update-gatheringSkill.dto"), { "UpdateGatheringSkillDto": { name: { required: false, type: () => String, maxLength: 256 }, regionId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/gatheringSkill/gatheringSkillRequirement/dto/create-gatheringSkillRequirement.dto"), { "CreateGatheringSkillRequirementDto": { skillId: { required: true, type: () => Number, minimum: 1 }, unlockLevel: { required: true, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, resourceVariantId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/gatheringSkill/gatheringSkillRequirement/dto/update-gatheringSkillRequirement.dto"), { "UpdateGatheringSkillRequirementDto": { skillId: { required: false, type: () => Number, minimum: 1 }, unlockLevel: { required: false, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, resourceVariantId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/craftingSkill/craftingSkillRequirement/dto/create-craftingSkillRequirement.dto"), { "CreateCraftingSkillRequirementDto": { skillId: { required: true, type: () => Number, minimum: 1 }, unlockLevel: { required: true, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, recipeId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/craftingSkill/craftingSkillRequirement/dto/update-craftingSkillRequirement.dto"), { "UpdateCraftingSkillRequirementDto": { skillId: { required: true, type: () => Number, minimum: 1 }, unlockLevel: { required: true, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, recipeId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/craftingSkill/dto/create-craftingSkill.dto"), { "CreateCraftingSkillDto": { name: { required: true, type: () => String, maxLength: 256 }, regionId: { required: true, type: () => Number, minimum: 1 } } }], [import("./skills/craftingSkill/dto/update-craftingSkill.dto"), { "UpdateCraftingSkillDto": { name: { required: false, type: () => String, maxLength: 256 }, regionId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/combatSkill/combatSkillRequirement/dto/create-combatSkillRequirement.dto"), { "CreateCombatSkillRequirementDto": { skillId: { required: true, type: () => Number, minimum: 1 }, unlockLevel: { required: true, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, monsterVariantId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/combatSkill/combatSkillRequirement/dto/update-combatSkillRequirement.dto"), { "UpdateCombatSkillRequirementDto": { skillId: { required: false, type: () => Number, minimum: 1 }, unlockLevel: { required: false, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, monsterVariantId: { required: false, type: () => Number, minimum: 1 } } }], [import("./skills/combatSkill/dto/create-combatSkill.dto"), { "CreateCombatSkillDto": { name: { required: true, type: () => String, maxLength: 256 }, regionId: { required: true, type: () => Number, minimum: 1 } } }], [import("./skills/combatSkill/dto/update-combatSkill.dto"), { "UpdateCombatSkillDto": { name: { required: false, type: () => String, maxLength: 256 }, regionId: { required: false, type: () => Number, minimum: 1 } } }], [import("./monsters/monsterVariants/dto/create-monsterVariant.dto"), { "CreateMonsterVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, monsterId: { required: true, type: () => Number, minimum: 1 } } }], [import("./monsters/monsterVariants/dto/update-monsterVariant.dto"), { "UpdateMonsterVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, monsterId: { required: false, type: () => Number, minimum: 1 } } }], [import("./monsters/dto/create-monster.dto"), { "CreateMonsterDto": { name: { required: true, type: () => String, maxLength: 256 }, skillId: { required: true, type: () => Number, minimum: 1 }, passive: { required: true, type: () => Boolean }, attackElement: { required: true, type: () => Object }, immuneElement: { required: true, type: () => Object }, vulnerableElement: { required: true, type: () => Object } } }], [import("./monsters/dto/update-monster.dto"), { "UpdateMonsterDto": { name: { required: false, type: () => String, maxLength: 256 }, skillId: { required: false, type: () => Number, minimum: 1 }, passive: { required: false, type: () => Boolean }, attackElement: { required: false, type: () => Object }, immuneElement: { required: false, type: () => Object }, vulnerableElement: { required: false, type: () => Object } } }], [import("./monsters/dropTables/dto/create-dropTable.dto"), { "CreateDropTableDto": { monsterVariantId: { required: true, type: () => Number, minimum: 1 }, resourceVariantIds: { required: false, type: () => [Number], minimum: 1 }, weaponVariantIds: { required: false, type: () => [Number], minimum: 1 }, armorVariantIds: { required: false, type: () => [Number], minimum: 1 }, consumableVariantIds: { required: false, type: () => [Number], minimum: 1 }, currency: { required: false, type: () => Number, minimum: 1 } } }], [import("./monsters/dropTables/dto/update-dropTable.dto"), { "UpdateDropTableDto": { monsterVariantId: { required: false, type: () => Number, minimum: 1 }, resourceVariantIds: { required: false, type: () => [Number], minimum: 1 }, weaponVariantIds: { required: false, type: () => [Number], minimum: 1 }, armorVariantIds: { required: false, type: () => [Number], minimum: 1 }, consumableVariantIds: { required: false, type: () => [Number], minimum: 1 }, currency: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/resources/dto/create-resource.dto"), { "CreateResourceDto": { name: { required: true, type: () => String, maxLength: 256 }, skillId: { required: true, type: () => Number, minimum: 1 }, passive: { required: true, type: () => Boolean } } }], [import("./items/resources/dto/update-resource.dto"), { "UpdateResourceDto": { name: { required: false, type: () => String, maxLength: 256 }, skillId: { required: false, type: () => Number, minimum: 1 }, passive: { required: false, type: () => Boolean } } }], [import("./items/resources/resourceVariants/dto/create-resourceVariant.dto"), { "CreateResourceVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, resourceId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/resources/resourceVariants/dto/update-resourceVariant.dto"), { "UpdateResourceVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, resourceId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/consumables/consumableVariants/dto/create-consumableVariant.dto"), { "CreateConsumableVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, consumableId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/consumables/consumableVariants/dto/update-consumableVariant.dto"), { "UpdateConsumableVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, consumableId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/consumables/dto/create-consumable.dto"), { "CreateConsumableDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./items/consumables/dto/update-consumable.dto"), { "UpdateConsumableDto": { name: { required: false, type: () => String, maxLength: 256 } } }], [import("./items/weapons/weaponVariants/dto/create-weaponVariant.dto"), { "CreateWeaponVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, weaponId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/weapons/weaponVariants/dto/update-weaponVariant.dto"), { "UpdateWeaponVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, weaponId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/weapons/dto/create-weapon.dto"), { "CreateWeaponDto": { name: { required: true, type: () => String, maxLength: 256 }, faction: { required: true, type: () => Object }, element: { required: true, type: () => Object }, isRanged: { required: true, type: () => Boolean }, isTwoHanded: { required: true, type: () => Boolean } } }], [import("./items/weapons/dto/update-weapon.dto"), { "UpdateWeaponDto": { name: { required: false, type: () => String, maxLength: 256 }, faction: { required: false, type: () => Object }, element: { required: false, type: () => Object }, isRanged: { required: false, type: () => Boolean }, isTwoHanded: { required: false, type: () => Boolean } } }], [import("./items/armors/armorVariants/dto/create-armorVariant.dto"), { "CreateArmorVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, armorId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/armors/armorVariants/dto/update-armorVariant.dto"), { "UpdateArmorVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, armorId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/armors/dto/create-armor.dto"), { "CreateArmorDto": { name: { required: true, type: () => String, maxLength: 256 }, faction: { required: true, type: () => Object }, slot: { required: true, type: () => Object } } }], [import("./items/armors/dto/update-armor.dto"), { "UpdateArmorDto": { name: { required: false, type: () => String, maxLength: 256 }, faction: { required: false, type: () => Object }, slot: { required: false, type: () => Object } } }], [import("./items/miscItems/dto/create-miscItem.dto"), { "CreateMiscItemDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./items/miscItems/dto/update-miscItem.dto"), { "UpdateMiscItemDto": { name: { required: false, type: () => String, maxLength: 256 } } }], [import("./npcs/dto/create-npc.dto"), { "CreateNpcDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./npcs/dto/update-npc.dto"), { "UpdateNpcDto": { name: { required: false, type: () => String, maxLength: 256 } } }], [import("./npcs/vendors/dto/create-vendor.dto"), { "CreateVendorDto": { npcId: { required: true, type: () => Number, minimum: 1 }, resourceVariantIds: { required: false, type: () => [Number], minimum: 1 }, weaponVariantIds: { required: false, type: () => [Number], minimum: 1 }, armorVariantIds: { required: false, type: () => [Number], minimum: 1 }, consumableVariantIds: { required: false, type: () => [Number], minimum: 1 }, miscItemsIds: { required: false, type: () => [Number], minimum: 1 } } }], [import("./npcs/vendors/dto/update-vendor.dto"), { "UpdateVendorDto": { npcId: { required: false, type: () => Number, minimum: 1 }, resourceVariantIds: { required: false, type: () => [Number], minimum: 1 }, weaponVariantIds: { required: false, type: () => [Number], minimum: 1 }, armorVariantIds: { required: false, type: () => [Number], minimum: 1 }, consumableVariantIds: { required: false, type: () => [Number], minimum: 1 }, miscItemsIds: { required: false, type: () => [Number], minimum: 1 } } }], [import("./quests/questSteps/dto/create-questStep.dto"), { "CreateQuestStepDto": { index: { required: true, type: () => Number, minimum: 1 }, description: { required: true, type: () => String, maxLength: 400 }, questId: { required: true, type: () => Number, minimum: 1 }, roomId: { required: false, type: () => Number, minimum: 1 }, npcId: { required: false, type: () => Number, minimum: 1 } } }], [import("./quests/questSteps/dto/update-questStep.dto"), { "UpdateQuestStepDto": { index: { required: false, type: () => Number, minimum: 1 }, description: { required: false, type: () => String, maxLength: 400 }, questId: { required: false, type: () => Number, minimum: 1 }, roomId: { required: false, type: () => Number, minimum: 1 }, npcId: { required: false, type: () => Number, minimum: 1 } } }], [import("./quests/dto/create-quest.dto"), { "CreateQuestDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./quests/dto/update-quest.dto"), { "UpdateQuestDto": { name: { required: false, type: () => String, maxLength: 256 } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./auth/auth.controller"), { "AuthController": { "signIn": {} } }], [import("./regions/regions.controller"), { "RegionsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./rooms/rooms.controller"), { "RoomsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/gatheringSkill/gatheringSkills.controller"), { "GatheringSkillsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/gatheringSkill/gatheringSkillRequirement/gatheringSkillRequirements.controller"), { "GatheringSkillRequirementsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/craftingSkill/craftingSkillRequirement/craftingSkillRequirements.controller"), { "CraftingSkillRequirementsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/craftingSkill/craftingSkills.controller"), { "CraftingSkillsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/combatSkill/combatSkillRequirement/combatSkillRequirements.controller"), { "CombatSkillRequirementsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/combatSkill/combatSkills.controller"), { "CombatSkillsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/skills.controller"), { "SkillsController": { "find": {} } }], [import("./monsters/monsterVariants/monsterVariants.controller"), { "MonsterVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./monsters/monsters.controller"), { "MonstersController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./monsters/dropTables/dropTables.controller"), { "DropTablesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/items.controller"), { "ItemsController": { "find": {} } }], [import("./items/resources/resources.controller"), { "ResourcesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/resources/resourceVariants/resourceVariants.controller"), { "ResourceVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/consumables/consumableVariants/consumableVariants.controller"), { "ConsumableVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/consumables/consumables.controller"), { "ConsumablesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/weapons/weaponVariants/weaponVariants.controller"), { "WeaponVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/weapons/weapons.controller"), { "WeaponsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/armors/armorVariants/armorVariants.controller"), { "ArmorVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/armors/armors.controller"), { "ArmorsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/miscItems/miscItems.controller"), { "MiscItemsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./npcs/npcs.controller"), { "NpcsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./npcs/vendors/vendors.controller"), { "VendorsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./quests/questSteps/questSteps.controller"), { "QuestStepsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./quests/quests.controller"), { "QuestsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }]] } };
};