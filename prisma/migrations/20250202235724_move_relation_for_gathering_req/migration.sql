/*
  Warnings:

  - You are about to drop the column `requirementId` on the `ResourceVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resourceVariantId]` on the table `GatheringSkillRequirement` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ResourceVariant" DROP CONSTRAINT "ResourceVariant_requirementId_fkey";

-- DropIndex
DROP INDEX "ResourceVariant_requirementId_key";

-- AlterTable
ALTER TABLE "GatheringSkillRequirement" ADD COLUMN     "resourceVariantId" INTEGER;

-- AlterTable
ALTER TABLE "ResourceVariant" DROP COLUMN "requirementId";

-- CreateIndex
CREATE UNIQUE INDEX "GatheringSkillRequirement_resourceVariantId_key" ON "GatheringSkillRequirement"("resourceVariantId");

-- AddForeignKey
ALTER TABLE "GatheringSkillRequirement" ADD CONSTRAINT "GatheringSkillRequirement_resourceVariantId_fkey" FOREIGN KEY ("resourceVariantId") REFERENCES "ResourceVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
