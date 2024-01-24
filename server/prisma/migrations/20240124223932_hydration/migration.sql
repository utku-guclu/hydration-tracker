-- CreateTable
CREATE TABLE "HydrationLog" (
    "id" SERIAL NOT NULL,
    "intake" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HydrationLog_pkey" PRIMARY KEY ("id")
);
