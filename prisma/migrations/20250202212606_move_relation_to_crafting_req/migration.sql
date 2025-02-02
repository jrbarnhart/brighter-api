/*
  Warnings:

  - You are about to drop the column `requirementId` on the `CraftingRecipe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recipeId]` on the table `CraftingSkillRequirement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipeId` to the `CraftingSkillRequirement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CraftingRecipe" DROP CONSTRAINT "CraftingRecipe_requirementId_fkey";

-- DropIndex
DROP INDEX "CraftingRecipe_requirementId_key";

-- AlterTable
ALTER TABLE "CraftingRecipe" DROP COLUMN "requirementId";

-- AlterTable
ALTER TABLE "CraftingSkillRequirement" ADD COLUMN     "recipeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CraftingSkillRequirement_recipeId_key" ON "CraftingSkillRequirement"("recipeId");

-- AddForeignKey
ALTER TABLE "CraftingSkillRequirement" ADD CONSTRAINT "CraftingSkillRequirement_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
