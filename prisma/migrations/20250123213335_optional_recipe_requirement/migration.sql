-- DropForeignKey
ALTER TABLE "CraftingRecipe" DROP CONSTRAINT "CraftingRecipe_requirementId_fkey";

-- AlterTable
ALTER TABLE "CraftingRecipe" ALTER COLUMN "requirementId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CraftingRecipe" ADD CONSTRAINT "CraftingRecipe_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "CraftingSkillRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
