/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProductCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductCart" DROP CONSTRAINT "ProductCart_cartid_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductCart" DROP CONSTRAINT "ProductCart_productid_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "updateAt",
ADD COLUMN     "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updateAt",
ADD COLUMN     "creatAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."ProductCart";

-- CreateTable
CREATE TABLE "ProducCart" (
    "productid" INTEGER NOT NULL,
    "cartid" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProducCart_productid_cartid_key" ON "ProducCart"("productid", "cartid");

-- AddForeignKey
ALTER TABLE "ProducCart" ADD CONSTRAINT "ProducCart_cartid_fkey" FOREIGN KEY ("cartid") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProducCart" ADD CONSTRAINT "ProducCart_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
