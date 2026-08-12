-- AlterEnum
ALTER TYPE "SessionStatus" ADD VALUE 'EXPIRED';

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_skill_id_fkey";

-- AlterTable
ALTER TABLE "Sessions" ALTER COLUMN "skill_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
