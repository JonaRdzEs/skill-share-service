-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "token_expire_date" TIMESTAMPTZ;
