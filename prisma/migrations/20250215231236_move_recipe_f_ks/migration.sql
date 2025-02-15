/*
  Warnings:

  - You are about to drop the column `recipeId` on the `ArmorVariant` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `ConsumableVariant` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `WeaponVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[outputConsumableVariantId]` on the table `CraftingRecipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outputWeaponVariantId]` on the table `CraftingRecipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outputArmorVariantId]` on the table `CraftingRecipe` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ArmorVariant" DROP CONSTRAINT "ArmorVariant_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "ConsumableVariant" DROP CONSTRAINT "ConsumableVariant_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "WeaponVariant" DROP CONSTRAINT "WeaponVariant_recipeId_fkey";

-- DropIndex
DROP INDEX "ArmorVariant_recipeId_key";

-- DropIndex
DROP INDEX "ConsumableVariant_recipeId_key";

-- DropIndex
DROP INDEX "WeaponVariant_recipeId_key";

-- AlterTable
ALTER TABLE "ArmorVariant" DROP COLUMN "recipeId";

-- AlterTable
ALTER TABLE "ConsumableVariant" DROP COLUMN "recipeId";

-- AlterTable
ALTER TABLE "CraftingRecipe" ADD COLUMN     "outputArmorVariantId" INTEGER,
ADD COLUMN     "outputConsumableVariantId" INTEGER,
ADD COLUMN     "outputWeaponVariantId" INTEGER;

-- AlterTable
ALTER TABLE "WeaponVariant" DROP COLUMN "recipeId";

-- CreateIndex
CREATE UNIQUE INDEX "CraftingRecipe_outputConsumableVariantId_key" ON "CraftingRecipe"("outputConsumableVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "CraftingRecipe_outputWeaponVariantId_key" ON "CraftingRecipe"("outputWeaponVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "CraftingRecipe_outputArmorVariantId_key" ON "CraftingRecipe"("outputArmorVariantId");

-- AddForeignKey
ALTER TABLE "CraftingRecipe" ADD CONSTRAINT "CraftingRecipe_outputConsumableVariantId_fkey" FOREIGN KEY ("outputConsumableVariantId") REFERENCES "ConsumableVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingRecipe" ADD CONSTRAINT "CraftingRecipe_outputWeaponVariantId_fkey" FOREIGN KEY ("outputWeaponVariantId") REFERENCES "WeaponVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftingRecipe" ADD CONSTRAINT "CraftingRecipe_outputArmorVariantId_fkey" FOREIGN KEY ("outputArmorVariantId") REFERENCES "ArmorVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
