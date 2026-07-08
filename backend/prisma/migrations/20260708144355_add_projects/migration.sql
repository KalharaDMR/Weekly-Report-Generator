/*
  Warnings:

  - You are about to drop the column `tasksCompleted` on the `weekly_reports` table. All the data in the column will be lost.
  - You are about to drop the column `tasksPlanned` on the `weekly_reports` table. All the data in the column will be lost.
  - Added the required column `completedTasks` to the `weekly_reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plannedTasks` to the `weekly_reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."projects" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."weekly_reports" DROP COLUMN "tasksCompleted",
DROP COLUMN "tasksPlanned",
ADD COLUMN     "completedTasks" TEXT NOT NULL,
ADD COLUMN     "plannedTasks" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "projects_createdById_idx" ON "public"."projects"("createdById");

-- CreateIndex
CREATE INDEX "users_department_idx" ON "public"."users"("department");

-- CreateIndex
CREATE INDEX "weekly_reports_status_idx" ON "public"."weekly_reports"("status");

-- CreateIndex
CREATE INDEX "weekly_reports_userId_weekStart_idx" ON "public"."weekly_reports"("userId", "weekStart");
