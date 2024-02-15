/*
  Warnings:

  - Added the required column `userId` to the `HydrationLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HydrationLog" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HydrationLog" ADD CONSTRAINT "HydrationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
