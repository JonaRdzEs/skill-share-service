-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('teacher', 'student');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'student';
