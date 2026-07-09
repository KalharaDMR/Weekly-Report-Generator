-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ReportStatus" ADD VALUE 'REVIEWED';
ALTER TYPE "public"."ReportStatus" ADD VALUE 'APPROVED';

-- DropIndex
DROP INDEX "public"."weekly_reports_userId_weekStart_idx";

-- AlterTable
ALTER TABLE "public"."weekly_reports" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedById" TEXT;
