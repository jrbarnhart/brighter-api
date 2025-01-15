-- CreateEnum
CREATE TYPE "Element" AS ENUM ('ARBORAE', 'CRYONAE', 'INFERNAE', 'NECROMAE', 'TEMPESTAE', 'IMPACT', 'NONE');

-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('CRYOKNIGHT', 'GUARDIAN', 'HAMMERMAGE', 'NONE');

-- CreateEnum
CREATE TYPE "GearSlot" AS ENUM ('HEAD', 'NECK', 'TORSO', 'BACK', 'HANDS', 'SHIELD', 'LEGS', 'FEET');

-- CreateEnum
CREATE TYPE "BankType" AS ENUM ('BONES', 'BUILDING', 'CAPES', 'EXPLOSIVES', 'BAIT', 'HIDES', 'INGREDIENTS', 'LEATHERS', 'LUMBER', 'MONUMENT', 'ORE', 'REAGENTS', 'POTIONS', 'QUARTERMASTER', 'STONE', 'TIMBER');

-- CreateTable
CREATE TABLE "CombatSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "CombatSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatSkillRequirement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "unlockLevel" INTEGER NOT NULL,

    CONSTRAINT "CombatSkillRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "passive" BOOLEAN NOT NULL,
    "attackElement" "Element" NOT NULL,
    "immuneElement" "Element" NOT NULL,
    "vulnerableElement" "Element" NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "monsterId" INTEGER NOT NULL,
    "requirementId" INTEGER NOT NULL,

    CONSTRAINT "MonsterVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DropTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "monsterVariantId" INTEGER NOT NULL,
    "currency" INTEGER NOT NULL,

    CONSTRAINT "DropTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GatheringSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "GatheringSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GatheringSkillRequirement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "unlockLevel" INTEGER NOT NULL,

    CONSTRAINT "GatheringSkillRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "passive" BOOLEAN NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "requirementId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "ResourceVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftingSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "CraftingSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftingSkillRequirement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "unlockLevel" INTEGER NOT NULL,

    CONSTRAINT "CraftingSkillRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftingRecipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "requirementId" INTEGER NOT NULL,

    CONSTRAINT "CraftingRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftingSpot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "CraftingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "faction" "Faction" NOT NULL,
    "isRanged" BOOLEAN NOT NULL,
    "isTwoHanded" BOOLEAN NOT NULL,
    "element" "Element" NOT NULL,
    "speedMs" INTEGER NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weaponId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "WeaponVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "faction" "Faction" NOT NULL,
    "slot" "GearSlot" NOT NULL,

    CONSTRAINT "Armor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArmorVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "armorId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "ArmorVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Consumable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumableVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "consumableId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "ConsumableVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiscItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MiscItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NPC" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NPC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "npcId" INTEGER NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestStep" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "questId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "npcId" INTEGER NOT NULL,

    CONSTRAINT "QuestStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Portal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,
    "type" "BankType" NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obelisk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Obelisk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MonsterToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MonsterToRoom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DropTableToResourceVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DropTableToResourceVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DropTableToWeaponVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DropTableToWeaponVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ResourceToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ResourceToRoom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ResourceVariantToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ResourceVariantToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CraftingRecipeToResourceVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CraftingRecipeToResourceVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CraftingRecipeToMiscItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CraftingRecipeToMiscItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArmorVariantToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArmorVariantToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ArmorVariantToDropTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArmorVariantToDropTable_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ConsumableVariantToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ConsumableVariantToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ConsumableVariantToDropTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ConsumableVariantToDropTable_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MiscItemToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MiscItemToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NPCToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NPCToRoom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_VendorToWeaponVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VendorToWeaponVariant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonsterVariant_requirementId_key" ON "MonsterVariant"("requirementId");

-- CreateIndex
CREATE UNIQUE INDEX "DropTable_monsterVariantId_key" ON "DropTable"("monsterVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceVariant_requirementId_key" ON "ResourceVariant"("requirementId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceVariant_resourceId_key" ON "ResourceVariant"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "CraftingRecipe_requirementId_key" ON "CraftingRecipe"("requirementId");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_regionId_key" ON "Weapon"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponVariant_recipeId_key" ON "WeaponVariant"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Armor_regionId_key" ON "Armor"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorVariant_armorId_key" ON "ArmorVariant"("armorId");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorVariant_recipeId_key" ON "ArmorVariant"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumableVariant_consumableId_key" ON "ConsumableVariant"("consumableId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumableVariant_recipeId_key" ON "ConsumableVariant"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_npcId_key" ON "Vendor"("npcId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestStep_questId_key" ON "QuestStep"("questId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestStep_roomId_key" ON "QuestStep"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestStep_npcId_key" ON "QuestStep"("npcId");

-- CreateIndex
CREATE UNIQUE INDEX "Portal_roomId_key" ON "Portal"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_roomId_key" ON "Bank"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "Obelisk_roomId_key" ON "Obelisk"("roomId");

-- CreateIndex
CREATE INDEX "_MonsterToRoom_B_index" ON "_MonsterToRoom"("B");

-- CreateIndex
CREATE INDEX "_DropTableToResourceVariant_B_index" ON "_DropTableToResourceVariant"("B");

-- CreateIndex
CREATE INDEX "_DropTableToWeaponVariant_B_index" ON "_DropTableToWeaponVariant"("B");

-- CreateIndex
CREATE INDEX "_ResourceToRoom_B_index" ON "_ResourceToRoom"("B");

-- CreateIndex
CREATE INDEX "_ResourceVariantToVendor_B_index" ON "_ResourceVariantToVendor"("B");

-- CreateIndex
CREATE INDEX "_CraftingRecipeToResourceVariant_B_index" ON "_CraftingRecipeToResourceVariant"("B");

-- CreateIndex
CREATE INDEX "_CraftingRecipeToMiscItem_B_index" ON "_CraftingRecipeToMiscItem"("B");

-- CreateIndex
CREATE INDEX "_ArmorVariantToVendor_B_index" ON "_ArmorVariantToVendor"("B");

-- CreateIndex
CREATE INDEX "_ArmorVariantToDropTable_B_index" ON "_ArmorVariantToDropTable"("B");

-- CreateIndex
CREATE INDEX "_ConsumableVariantToVendor_B_index" ON "_ConsumableVariantToVendor"("B");

-- CreateIndex
CREATE INDEX "_ConsumableVariantToDropTable_B_index" ON "_ConsumableVariantToDropTable"("B");

-- CreateIndex
CREATE INDEX "_MiscItemToVendor_B_index" ON "_MiscItemToVendor"("B");

-- CreateIndex
CREATE INDEX "_NPCToRoom_B_index" ON "_NPCToRoom"("B");

-- CreateIndex
CREATE INDEX "_VendorToWeaponVariant_B_index" ON "_VendorToWeaponVariant"("B");

-- AddForeignKey
ALTER TABLE "CombatSkill" ADD CONSTRAINT "CombatSkill_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatSkillRequirement" ADD CONSTRAINT "CombatSkillRequirement_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "CombatSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "CombatSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterVariant" ADD CONSTRAINT "MonsterVariant_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterVariant" ADD CONSTRAINT "MonsterVariant_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "CombatSkillRequirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropTable" ADD CONSTRAINT "DropTable_monsterVariantId_fkey" FOREIGN KEY ("monsterVariantId") REFERENCES "MonsterVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatheringSkill" ADD CONSTRAINT "GatheringSkill_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GatheringSkillRequirement" ADD CONSTRAINT "GatheringSkillRequirement_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "GatheringSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "GatheringSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceVariant" ADD CONSTRAINT "ResourceVariant_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "GatheringSkillRequirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceVariant" ADD CONSTRAINT "ResourceVariant_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingSkill" ADD CONSTRAINT "CraftingSkill_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingSkillRequirement" ADD CONSTRAINT "CraftingSkillRequirement_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "CraftingSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingRecipe" ADD CONSTRAINT "CraftingRecipe_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "CraftingSkillRequirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingSpot" ADD CONSTRAINT "CraftingSpot_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "CraftingSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingSpot" ADD CONSTRAINT "CraftingSpot_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponVariant" ADD CONSTRAINT "WeaponVariant_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponVariant" ADD CONSTRAINT "WeaponVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armor" ADD CONSTRAINT "Armor_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorVariant" ADD CONSTRAINT "ArmorVariant_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "Armor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorVariant" ADD CONSTRAINT "ArmorVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumableVariant" ADD CONSTRAINT "ConsumableVariant_consumableId_fkey" FOREIGN KEY ("consumableId") REFERENCES "Consumable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumableVariant" ADD CONSTRAINT "ConsumableVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "NPC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "NPC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portal" ADD CONSTRAINT "Portal_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obelisk" ADD CONSTRAINT "Obelisk_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToRoom" ADD CONSTRAINT "_MonsterToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MonsterToRoom" ADD CONSTRAINT "_MonsterToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DropTableToResourceVariant" ADD CONSTRAINT "_DropTableToResourceVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "DropTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DropTableToResourceVariant" ADD CONSTRAINT "_DropTableToResourceVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DropTableToWeaponVariant" ADD CONSTRAINT "_DropTableToWeaponVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "DropTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DropTableToWeaponVariant" ADD CONSTRAINT "_DropTableToWeaponVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "WeaponVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceToRoom" ADD CONSTRAINT "_ResourceToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceToRoom" ADD CONSTRAINT "_ResourceToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceVariantToVendor" ADD CONSTRAINT "_ResourceVariantToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "ResourceVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceVariantToVendor" ADD CONSTRAINT "_ResourceVariantToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CraftingRecipeToResourceVariant" ADD CONSTRAINT "_CraftingRecipeToResourceVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "CraftingRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CraftingRecipeToResourceVariant" ADD CONSTRAINT "_CraftingRecipeToResourceVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "ResourceVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CraftingRecipeToMiscItem" ADD CONSTRAINT "_CraftingRecipeToMiscItem_A_fkey" FOREIGN KEY ("A") REFERENCES "CraftingRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CraftingRecipeToMiscItem" ADD CONSTRAINT "_CraftingRecipeToMiscItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MiscItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorVariantToVendor" ADD CONSTRAINT "_ArmorVariantToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "ArmorVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorVariantToVendor" ADD CONSTRAINT "_ArmorVariantToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorVariantToDropTable" ADD CONSTRAINT "_ArmorVariantToDropTable_A_fkey" FOREIGN KEY ("A") REFERENCES "ArmorVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArmorVariantToDropTable" ADD CONSTRAINT "_ArmorVariantToDropTable_B_fkey" FOREIGN KEY ("B") REFERENCES "DropTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumableVariantToVendor" ADD CONSTRAINT "_ConsumableVariantToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "ConsumableVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumableVariantToVendor" ADD CONSTRAINT "_ConsumableVariantToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumableVariantToDropTable" ADD CONSTRAINT "_ConsumableVariantToDropTable_A_fkey" FOREIGN KEY ("A") REFERENCES "ConsumableVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsumableVariantToDropTable" ADD CONSTRAINT "_ConsumableVariantToDropTable_B_fkey" FOREIGN KEY ("B") REFERENCES "DropTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiscItemToVendor" ADD CONSTRAINT "_MiscItemToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "MiscItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MiscItemToVendor" ADD CONSTRAINT "_MiscItemToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NPCToRoom" ADD CONSTRAINT "_NPCToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "NPC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NPCToRoom" ADD CONSTRAINT "_NPCToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendorToWeaponVariant" ADD CONSTRAINT "_VendorToWeaponVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VendorToWeaponVariant" ADD CONSTRAINT "_VendorToWeaponVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "WeaponVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
