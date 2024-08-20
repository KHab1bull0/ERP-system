/*
  Warnings:

  - You are about to drop the column `phone_url` on the `student` table. All the data in the column will be lost.
  - Added the required column `photo_url` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "phone_url",
ADD COLUMN     "photo_url" TEXT NOT NULL;
