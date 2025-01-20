/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./auth/dto/signIn.dto"), { "SignInDto": { username: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./monsters/monsterVariants/dto/create-monsterVariant.dto"), { "CreateMonsterVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, monsterId: { required: true, type: () => Number, minimum: 1 } } }], [import("./monsters/monsterVariants/dto/update-monsterVariant.dto"), { "UpdateMonsterVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, monsterId: { required: false, type: () => Number, minimum: 1 } } }], [import("./monsters/dto/create-monster.dto"), { "CreateMonsterDto": { name: { required: true, type: () => String, maxLength: 256 }, skillId: { required: true, type: () => Number, minimum: 1 }, passive: { required: true, type: () => Boolean }, attackElement: { required: true, type: () => Object }, immuneElement: { required: true, type: () => Object }, vulnerableElement: { required: true, type: () => Object } } }], [import("./monsters/dto/update-monster.dto"), { "UpdateMonsterDto": { name: { required: false, type: () => String, maxLength: 256 }, skillId: { required: false, type: () => Number, minimum: 1 }, passive: { required: false, type: () => Boolean }, attackElement: { required: false, type: () => Object }, immuneElement: { required: false, type: () => Object }, vulnerableElement: { required: false, type: () => Object } } }], [import("./items/resources/dto/create-resource.dto"), { "CreateResourceDto": { name: { required: true, type: () => String, maxLength: 256 }, skillId: { required: true, type: () => Number, minimum: 1 }, passive: { required: true, type: () => Boolean } } }], [import("./items/resources/dto/update-resource.dto"), { "UpdateResourceDto": { name: { required: false, type: () => String, maxLength: 256 }, skillId: { required: false, type: () => Number, minimum: 1 }, passive: { required: false, type: () => Boolean } } }], [import("./items/resources/resourceVariants/dto/create-resourceVariant.dto"), { "CreateResourceVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, resourceId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/resources/resourceVariants/dto/update-resourceVariant.dto"), { "UpdateResourceVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, resourceId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/consumables/consumableVariants/dto/create-consumableVariant.dto"), { "CreateConsumableVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, consumableId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/consumables/consumableVariants/dto/update-consumableVariant.dto"), { "UpdateConsumableVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, consumableId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/consumables/dto/create-consumable.dto"), { "CreateConsumableDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./items/consumables/dto/update-consumable.dto"), { "UpdateConsumableDto": { name: { required: false, type: () => String, maxLength: 256 } } }], [import("./items/weapons/weaponVariants/dto/create-weaponVariant.dto"), { "CreateWeaponVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, weaponId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/weapons/weaponVariants/dto/update-weaponVariant.dto"), { "UpdateWeaponVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, weaponId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/weapons/dto/create-weapon.dto"), { "CreateWeaponDto": { name: { required: true, type: () => String, maxLength: 256 }, faction: { required: true, type: () => Object }, element: { required: true, type: () => Object }, isRanged: { required: true, type: () => Boolean }, isTwoHanded: { required: true, type: () => Boolean } } }], [import("./items/weapons/dto/update-weapon.dto"), { "UpdateWeaponDto": { name: { required: false, type: () => String, maxLength: 256 }, faction: { required: false, type: () => Object }, element: { required: false, type: () => Object }, isRanged: { required: false, type: () => Boolean }, isTwoHanded: { required: false, type: () => Boolean } } }], [import("./items/armors/armorVariants/dto/create-armorVariant.dto"), { "CreateArmorVariantDto": { name: { required: true, type: () => String, maxLength: 256 }, armorId: { required: true, type: () => Number, minimum: 1 } } }], [import("./items/armors/armorVariants/dto/update-armorVariant.dto"), { "UpdateArmorVariantDto": { name: { required: false, type: () => String, maxLength: 256 }, armorId: { required: false, type: () => Number, minimum: 1 } } }], [import("./items/armors/dto/create-armor.dto"), { "CreateArmorDto": { name: { required: true, type: () => String, maxLength: 256 }, faction: { required: true, type: () => Object }, slot: { required: true, type: () => Object } } }], [import("./items/armors/dto/update-armor.dto"), { "UpdateArmorDto": { name: { required: false, type: () => String, maxLength: 256 }, faction: { required: false, type: () => Object }, slot: { required: false, type: () => Object } } }], [import("./items/miscItems/dto/create-miscItem.dto"), { "CreateMiscItemDto": { name: { required: true, type: () => String, maxLength: 256 } } }], [import("./items/miscItems/dto/update-miscItem.dto"), { "UpdateMiscItemDto": { name: { required: false, type: () => String, maxLength: 256 } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./auth/auth.controller"), { "AuthController": { "signIn": {} } }], [import("./regions/regions.controller"), { "RegionsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./rooms/rooms.controller"), { "RoomsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/gatheringSkill/gatheringSkills.controller"), { "GatheringSkillsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/gatheringSkill/gatheringSkillRequirement/gatheringSkillRequirements.controller"), { "GatheringSkillRequirementsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/craftingSkill/craftingSkillRequirement/craftingSkillRequirements.controller"), { "CraftingSkillRequirementsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/craftingSkill/craftingSkills.controller"), { "CraftingSkillsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/combatSkill/combatSkillRequirement/combatSkillRequirements.controller"), { "CombatSkillRequirementsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/combatSkill/combatSkills.controller"), { "CombatSkillsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./skills/skills.controller"), { "SkillsController": { "find": {} } }], [import("./monsters/monsterVariants/monsterVariants.controller"), { "MonsterVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./monsters/monsters.controller"), { "MonstersController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/items.controller"), { "ItemsController": { "find": {} } }], [import("./items/resources/resources.controller"), { "ResourcesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/resources/resourceVariants/resourceVariants.controller"), { "ResourceVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/consumables/consumableVariants/consumableVariants.controller"), { "ConsumableVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/consumables/consumables.controller"), { "ConsumablesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/weapons/weaponVariants/weaponVariants.controller"), { "WeaponVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/weapons/weapons.controller"), { "WeaponsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/armors/armorVariants/armorVariants.controller"), { "ArmorVariantsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/armors/armors.controller"), { "ArmorsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./items/miscItems/miscItems.controller"), { "MiscItemsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./npcs/npcs.controller"), { "NpcsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./npcs/vendors/vendors.controller"), { "VendorsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./quests/questSteps/questSteps.controller"), { "QuestStepsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./quests/quests.controller"), { "QuestsController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }], [import("./monsters/dropTables/dropTables.controller"), { "DropTablesController": { "create": {}, "findAll": {}, "findOne": {}, "update": {}, "remove": {} } }]] } };
};