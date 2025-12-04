/*
  Warnings:

  - You are about to drop the column `Firstname` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Lastname` on the `Product` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Firstname",
DROP COLUMN "Lastname",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
