/*
  Warnings:

  - You are about to drop the `Bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CraftingSpot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bank" DROP CONSTRAINT "Bank_roomId_fkey";

-- DropForeignKey
ALTER TABLE "CraftingSpot" DROP CONSTRAINT "CraftingSpot_roomId_fkey";

-- DropForeignKey
ALTER TABLE "CraftingSpot" DROP CONSTRAINT "CraftingSpot_skillId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "banks" "BankType"[];

-- DropTable
DROP TABLE "Bank";

-- DropTable
DROP TABLE "CraftingSpot";

-- CreateTable
CREATE TABLE "_CraftingSkillToRoom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CraftingSkillToRoom_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CraftingSkillToRoom_B_index" ON "_CraftingSkillToRoom"("B");

-- AddForeignKey
ALTER TABLE "_CraftingSkillToRoom" ADD CONSTRAINT "_CraftingSkillToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "CraftingSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CraftingSkillToRoom" ADD CONSTRAINT "_CraftingSkillToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
