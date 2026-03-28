/*
  Warnings:

  - The primary key for the `Habit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `targetCount` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Habit` table. All the data in the column will be lost.
  - The `id` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `HabitLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_userId_fkey";

-- DropForeignKey
ALTER TABLE "HabitLog" DROP CONSTRAINT "HabitLog_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_pkey",
DROP COLUMN "description",
DROP COLUMN "targetCount",
DROP COLUMN "userId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Habit_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "HabitLog";

-- DropTable
DROP TABLE "User";
