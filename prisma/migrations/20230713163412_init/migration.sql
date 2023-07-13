/*
  Warnings:

  - You are about to drop the column `photo` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "photo";

-- CreateTable
CREATE TABLE "Image" (
    "image_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageBuffer" BYTEA NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);
