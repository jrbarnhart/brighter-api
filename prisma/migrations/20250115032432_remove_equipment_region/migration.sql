/*
  Warnings:

  - You are about to drop the column `regionId` on the `Armor` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `Weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Armor" DROP CONSTRAINT "Armor_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_regionId_fkey";

-- DropIndex
DROP INDEX "Armor_regionId_key";

-- DropIndex
DROP INDEX "Weapon_regionId_key";

-- AlterTable
ALTER TABLE "Armor" DROP COLUMN "regionId";

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "regionId";
