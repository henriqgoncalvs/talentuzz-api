-- CreateTable
CREATE TABLE "PublicFile" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PublicFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicFile_userId_key" ON "PublicFile"("userId");

-- AddForeignKey
ALTER TABLE "PublicFile" ADD CONSTRAINT "PublicFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
