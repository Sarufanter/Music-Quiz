/*
  Warnings:

  - Added the required column `compositionPart` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compositionTheme` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "compositionPart" TEXT NOT NULL,
ADD COLUMN     "compositionTheme" TEXT NOT NULL;
