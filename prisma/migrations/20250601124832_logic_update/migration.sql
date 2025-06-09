/*
  Warnings:

  - You are about to drop the column `songId` on the `Result` table. All the data in the column will be lost.
  - Added the required column `presetId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_songId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "songId",
ADD COLUMN     "presetId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "collection" DROP NOT NULL,
ALTER COLUMN "compositionNumber" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "compositionPart" DROP NOT NULL,
ALTER COLUMN "compositionTheme" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "SongsPreset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
