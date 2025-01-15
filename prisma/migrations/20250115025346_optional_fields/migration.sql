/*
  Warnings:

  - You are about to drop the column `speedMs` on the `Weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArmorVariant" DROP CONSTRAINT "ArmorVariant_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumableVariant" DROP CONSTRAINT "ConsumableVariant_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "CraftingSpot" DROP CONSTRAINT "CraftingSpot_roomId_fkey";

-- DropForeignKey
ALTER TABLE "MonsterVariant" DROP CONSTRAINT "MonsterVariant_requirementId_fkey";

-- DropForeignKey
ALTER TABLE "QuestStep" DROP CONSTRAINT "QuestStep_npcId_fkey";

-- DropForeignKey
ALTER TABLE "QuestStep" DROP CONSTRAINT "QuestStep_roomId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceVariant" DROP CONSTRAINT "ResourceVariant_requirementId_fkey";

-- DropForeignKey
ALTER TABLE "WeaponVariant" DROP CONSTRAINT "WeaponVariant_recipeId_fkey";

-- AlterTable
ALTER TABLE "ArmorVariant" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ConsumableVariant" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CraftingSpot" ALTER COLUMN "roomId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MonsterVariant" ALTER COLUMN "requirementId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "QuestStep" ALTER COLUMN "roomId" DROP NOT NULL,
ALTER COLUMN "npcId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ResourceVariant" ALTER COLUMN "requirementId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "speedMs";

-- AlterTable
ALTER TABLE "WeaponVariant" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MonsterVariant" ADD CONSTRAINT "MonsterVariant_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "CombatSkillRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceVariant" ADD CONSTRAINT "ResourceVariant_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "GatheringSkillRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingSpot" ADD CONSTRAINT "CraftingSpot_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponVariant" ADD CONSTRAINT "WeaponVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArmorVariant" ADD CONSTRAINT "ArmorVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsumableVariant" ADD CONSTRAINT "ConsumableVariant_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestStep" ADD CONSTRAINT "QuestStep_npcId_fkey" FOREIGN KEY ("npcId") REFERENCES "NPC"("id") ON DELETE SET NULL ON UPDATE CASCADE;
