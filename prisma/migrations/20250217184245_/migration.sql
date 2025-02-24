/*
  Warnings:

  - You are about to drop the `OrdersHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OrdersHistory";

-- CreateTable
CREATE TABLE "OrderHistory" (
    "id" TEXT NOT NULL,
    "items" TEXT[],
    "tableNumber" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "paymentMode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "bookMark" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id")
);
