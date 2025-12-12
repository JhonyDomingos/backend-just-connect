/*
  Warnings:

  - You are about to drop the column `comment_created_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_updated_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `post_created_at` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_updated_at` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_updated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "comment_created_at",
DROP COLUMN "comment_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "post_created_at",
DROP COLUMN "post_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_created_at",
DROP COLUMN "user_updated_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
