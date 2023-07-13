/*
  Warnings:

  - Added the required column `id_user` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE image_image_id_seq;
ALTER TABLE "Image" ADD COLUMN     "id_user" INTEGER NOT NULL,
ALTER COLUMN "image_id" SET DEFAULT nextval('image_image_id_seq');
ALTER SEQUENCE image_image_id_seq OWNED BY "Image"."image_id";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
