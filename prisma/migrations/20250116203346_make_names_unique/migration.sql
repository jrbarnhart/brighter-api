/*
  Warnings:

  - You are about to drop the column `name` on the `DropTable` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Armor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ArmorVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CombatSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Consumable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ConsumableVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CraftingRecipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CraftingSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CraftingSpot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `GatheringSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MiscItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Monster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `NPC` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Quest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ResourceVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Weapon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `WeaponVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DropTable" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Armor_name_key" ON "Armor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ArmorVariant_name_key" ON "ArmorVariant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_name_key" ON "Bank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CombatSkill_name_key" ON "CombatSkill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Consumable_name_key" ON "Consumable"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumableVariant_name_key" ON "ConsumableVariant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CraftingRecipe_name_key" ON "CraftingRecipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CraftingSkill_name_key" ON "CraftingSkill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CraftingSpot_name_key" ON "CraftingSpot"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GatheringSkill_name_key" ON "GatheringSkill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MiscItem_name_key" ON "MiscItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Monster_name_key" ON "Monster"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NPC_name_key" ON "NPC"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_name_key" ON "Quest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceVariant_name_key" ON "ResourceVariant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponVariant_name_key" ON "WeaponVariant"("name");
