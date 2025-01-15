/*
  Warnings:

  - You are about to drop the column `name` on the `CombatSkillRequirement` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `CraftingSkillRequirement` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GatheringSkillRequirement` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `QuestStep` table. All the data in the column will be lost.
  - You are about to drop the `Obelisk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Portal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Obelisk" DROP CONSTRAINT "Obelisk_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Portal" DROP CONSTRAINT "Portal_roomId_fkey";

-- AlterTable
ALTER TABLE "CombatSkillRequirement" DROP COLUMN "name",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "CraftingSkillRequirement" DROP COLUMN "name",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "GatheringSkillRequirement" DROP COLUMN "name",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "QuestStep" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "obelisk" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "portal" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Obelisk";

-- DropTable
DROP TABLE "Portal";
