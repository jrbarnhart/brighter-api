-- DropForeignKey
ALTER TABLE "CraftingSkillRequirement" DROP CONSTRAINT "CraftingSkillRequirement_recipeId_fkey";

-- AlterTable
ALTER TABLE "CraftingSkillRequirement" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CraftingSkillRequirement" ADD CONSTRAINT "CraftingSkillRequirement_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "CraftingRecipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
