/*
  Warnings:

  - You are about to drop the column `statusOpen` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - A unique constraint covering the columns `[linkedin]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[instagram]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[github]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_resetToken_key";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "statusOpen",
ADD COLUMN     "status_open" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiry",
ADD COLUMN     "reset_token" TEXT,
ADD COLUMN     "reset_token_expiry" TIMESTAMP(3),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_linkedin_key" ON "users"("linkedin");

-- CreateIndex
CREATE UNIQUE INDEX "users_instagram_key" ON "users"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "users_github_key" ON "users"("github");

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_token_key" ON "users"("reset_token");
