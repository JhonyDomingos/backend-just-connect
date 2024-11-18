/*
  Warnings:

  - You are about to drop the `taglike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "taglike" DROP CONSTRAINT "taglike_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "taglike" DROP CONSTRAINT "taglike_user_id_fkey";

-- DropTable
DROP TABLE "taglike";

-- CreateTable
CREATE TABLE "tagFollow" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tagFollow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tagFollow" ADD CONSTRAINT "tagFollow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagFollow" ADD CONSTRAINT "tagFollow_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
