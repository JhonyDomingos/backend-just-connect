-- CreateTable
CREATE TABLE "PostReport" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "type_report" "TypeReport" NOT NULL,
    "post_report" VARCHAR(140) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "admin_validation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PostReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostReport" ADD CONSTRAINT "PostReport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReport" ADD CONSTRAINT "PostReport_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
