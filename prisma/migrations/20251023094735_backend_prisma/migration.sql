/*
  Warnings:

  - You are about to drop the `Userproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Userproduct" DROP CONSTRAINT "Userproduct_productid_fkey";

-- DropForeignKey
ALTER TABLE "public"."Userproduct" DROP CONSTRAINT "Userproduct_userid_fkey";

-- DropTable
DROP TABLE "public"."Userproduct";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCart" (
    "productid" INTEGER NOT NULL,
    "cartid" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userid_key" ON "Cart"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCart_cartid_productid_key" ON "ProductCart"("cartid", "productid");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCart" ADD CONSTRAINT "ProductCart_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCart" ADD CONSTRAINT "ProductCart_cartid_fkey" FOREIGN KEY ("cartid") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
