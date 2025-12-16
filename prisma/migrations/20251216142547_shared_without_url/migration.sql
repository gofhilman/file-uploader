/*
  Warnings:

  - You are about to drop the column `url` on the `Shared` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shared" DROP COLUMN "url",
ALTER COLUMN "createdAt" DROP DEFAULT;
