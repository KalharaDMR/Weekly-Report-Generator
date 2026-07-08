/*
  Warnings:

  - A unique constraint covering the columns `[userId,projectId,weekStart]` on the table `weekly_reports` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "department" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "weekly_reports_userId_projectId_weekStart_key" ON "public"."weekly_reports"("userId", "projectId", "weekStart");
