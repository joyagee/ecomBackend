/*
  Warnings:

  - You are about to drop the column `categoryy` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `creatAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `creatAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProducCart` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstname` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ProducCart" DROP CONSTRAINT "ProducCart_cartid_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProducCart" DROP CONSTRAINT "ProducCart_productid_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryy",
DROP COLUMN "creatAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "creatAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."ProducCart";

-- CreateTable
CREATE TABLE "ProductCart" (
    "productid" INTEGER NOT NULL,
    "cartid" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductCart_cartid_productid_key" ON "ProductCart"("cartid", "productid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "ProductCart" ADD CONSTRAINT "ProductCart_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCart" ADD CONSTRAINT "ProductCart_cartid_fkey" FOREIGN KEY ("cartid") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
