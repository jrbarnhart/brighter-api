/*
  Warnings:

  - A unique constraint covering the columns `[skillId]` on the table `Consumable` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Consumable" ADD COLUMN     "skillId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Consumable_skillId_key" ON "Consumable"("skillId");

-- AddForeignKey
ALTER TABLE "Consumable" ADD CONSTRAINT "Consumable_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "CraftingSkill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
