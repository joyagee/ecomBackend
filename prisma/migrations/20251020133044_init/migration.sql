-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "sizes" TEXT[],
    "defaultSize" TEXT NOT NULL,
    "colors" TEXT[],
    "defaultColor" TEXT NOT NULL,
    "bestSeller" BOOLEAN NOT NULL,
    "image" TEXT,
    "categoryy" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "newArrival" BOOLEAN NOT NULL,
    "tags" TEXT[],
    "categoryid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userproduct" (
    "userid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Userproduct_userid_productid_key" ON "Userproduct"("userid", "productid");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Userproduct" ADD CONSTRAINT "Userproduct_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Userproduct" ADD CONSTRAINT "Userproduct_productid_fkey" FOREIGN KEY ("productid") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
