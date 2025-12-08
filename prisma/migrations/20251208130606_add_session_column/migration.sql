/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `Shared` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Shared` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shared" DROP COLUMN "expiredAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");
