import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportStatus } from '@prisma/client';

import { getSubmissionStatus } from '../common/utils/report-status.util';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const reports = await this.prisma.weeklyReport.findMany();

    const totalReports = reports.length;

    const submittedReports = reports.filter(
      (r) =>
        getSubmissionStatus(r.status, r.weekEnd) === 'Submitted',
    ).length;

    const pendingReports = reports.filter(
      (r) =>
        getSubmissionStatus(r.status, r.weekEnd) === 'Pending',
    ).length;

    const lateReports = reports.filter(
      (r) =>
        getSubmissionStatus(r.status, r.weekEnd) === 'Late',
    ).length;

    const openBlockers = reports.filter(
      (r) => r.blockers,
    ).length;

    const complianceRate =
      totalReports === 0
        ? 0
        : Number(
            ((submittedReports / totalReports) * 100).toFixed(2),
          );

    return {
      totalReports,
      submittedReports,
      pendingReports,
      lateReports,
      complianceRate,
      openBlockers,
    };
  }

  async getRecentActivity() {
    const reports = await this.prisma.weeklyReport.findMany({
      take: 10,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            name: true,
          },
        },
      },
    });

    return reports.map((report) => ({
      ...report,
      submissionStatus: getSubmissionStatus(
        report.status,
        report.weekEnd,
      ),
    }));
  }

  async getCharts() {
    const reports = await this.prisma.weeklyReport.findMany({
      include: {
        project: true,
      },
    });

    const submitted = reports.filter(
      (r) =>
        getSubmissionStatus(r.status, r.weekEnd) === 'Submitted',
    ).length;

    const pending = reports.filter(
      (r) =>
        getSubmissionStatus(r.status, r.weekEnd) === 'Pending',
    ).length;

    const late = reports.filter(
      (r) =>
        getSubmissionStatus(r.status, r.weekEnd) === 'Late',
    ).length;

    const projectMap = new Map<string, number>();

    reports.forEach((report) => {
      projectMap.set(
        report.project.name,
        (projectMap.get(report.project.name) || 0) + 1,
      );
    });

    return {
      submissionStatus: [
        {
          status: 'Submitted',
          count: submitted,
        },
        {
          status: 'Pending',
          count: pending,
        },
        {
          status: 'Late',
          count: late,
        },
      ],

      projectDistribution: Array.from(projectMap).map(
        ([project, reports]) => ({
          project,
          reports,
        }),
      ),
    };
  }

  async getReports(filters: any) {
    const reports = await this.prisma.weeklyReport.findMany({
      where: {
        ...(filters.userId && {
          userId: filters.userId,
        }),

        ...(filters.projectId && {
          projectId: filters.projectId,
        }),

        ...(filters.status && {
          status: filters.status,
        }),

        ...(filters.weekStart && {
          weekStart: new Date(filters.weekStart),
        }),
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            role: true,
          },
        },

        project: true,
      },

      orderBy: {
        weekStart: 'desc',
      },
    });

    return reports.map((report) => ({
      ...report,
      submissionStatus: getSubmissionStatus(
        report.status,
        report.weekEnd,
      ),
    }));
  }
}