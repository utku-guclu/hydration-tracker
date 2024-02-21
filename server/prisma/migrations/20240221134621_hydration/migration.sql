-- CreateTable
CREATE TABLE "LogPool" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "intake" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LogPool_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogPool" ADD CONSTRAINT "LogPool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
