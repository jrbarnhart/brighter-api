/*
  Warnings:

  - You are about to drop the column `requirementId` on the `MonsterVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[monsterVariantId]` on the table `CombatSkillRequirement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MonsterVariant" DROP CONSTRAINT "MonsterVariant_requirementId_fkey";

-- DropIndex
DROP INDEX "MonsterVariant_requirementId_key";

-- AlterTable
ALTER TABLE "CombatSkillRequirement" ADD COLUMN     "monsterVariantId" INTEGER;

-- AlterTable
ALTER TABLE "MonsterVariant" DROP COLUMN "requirementId";

-- CreateIndex
CREATE UNIQUE INDEX "CombatSkillRequirement_monsterVariantId_key" ON "CombatSkillRequirement"("monsterVariantId");

-- AddForeignKey
ALTER TABLE "CombatSkillRequirement" ADD CONSTRAINT "CombatSkillRequirement_monsterVariantId_fkey" FOREIGN KEY ("monsterVariantId") REFERENCES "MonsterVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
