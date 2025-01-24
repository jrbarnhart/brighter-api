/*
  Warnings:

  - Changed the type of `attackElement` on the `Monster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `immuneElement` on the `Monster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vulnerableElement` on the `Monster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `element` on the `Weapon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AttackElement" AS ENUM ('ARBORAE', 'CRYONAE', 'INFERNAE', 'NECROMAE', 'TEMPESTAE', 'IMPACT', 'NONE');

-- AlterTable
ALTER TABLE "Monster" DROP COLUMN "attackElement",
ADD COLUMN     "attackElement" "AttackElement" NOT NULL,
DROP COLUMN "immuneElement",
ADD COLUMN     "immuneElement" "AttackElement" NOT NULL,
DROP COLUMN "vulnerableElement",
ADD COLUMN     "vulnerableElement" "AttackElement" NOT NULL;

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "element",
ADD COLUMN     "element" "AttackElement" NOT NULL;

-- DropEnum
DROP TYPE "Element";
