/*
  Warnings:

  - You are about to drop the `CommentReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentReport" DROP CONSTRAINT "CommentReport_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentReport" DROP CONSTRAINT "CommentReport_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PostReport" DROP CONSTRAINT "PostReport_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostReport" DROP CONSTRAINT "PostReport_user_id_fkey";

-- DropTable
DROP TABLE "CommentReport";

-- DropTable
DROP TABLE "PostLike";

-- DropTable
DROP TABLE "PostReport";

-- CreateTable
CREATE TABLE "postreport" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "type_report" "TypeReport" NOT NULL,
    "post_report" VARCHAR(140) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "admin_validation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "postreport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postlike" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "postlike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentreport" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "type_report" "TypeReport" NOT NULL,
    "post_report" VARCHAR(140) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "admin_validation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "commentreport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentlike" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commentlike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postreport" ADD CONSTRAINT "postreport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postreport" ADD CONSTRAINT "postreport_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postlike" ADD CONSTRAINT "postlike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postlike" ADD CONSTRAINT "postlike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentreport" ADD CONSTRAINT "commentreport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentreport" ADD CONSTRAINT "commentreport_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlike" ADD CONSTRAINT "commentlike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlike" ADD CONSTRAINT "commentlike_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
