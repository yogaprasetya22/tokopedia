/*
  Warnings:

  - You are about to drop the column `country` on the `Product` table. All the data in the column will be lost.
  - Added the required column `country` to the `Toko` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "Toko" ADD COLUMN     "country" TEXT NOT NULL;
