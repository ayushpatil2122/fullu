/*
  Warnings:

  - Added the required column `isOrdered` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isOrdered" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Secure" ALTER COLUMN "isVerified" SET DEFAULT false;
