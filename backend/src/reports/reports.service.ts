import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

import { ReportStatus } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateReportDto) {
    const existing = await this.prisma.weeklyReport.findFirst({
      where: {
        userId,
        projectId: dto.projectId,
        weekStart: new Date(dto.weekStart),
      },
    });

    if (existing) {
      throw new ConflictException(
        'Report already exists for this project and week',
      );
    }

    return this.prisma.weeklyReport.create({
      data: {
        userId,
        projectId: dto.projectId,
        weekStart: new Date(dto.weekStart),
        weekEnd: new Date(dto.weekEnd),
        completedTasks: dto.completedTasks,
        plannedTasks: dto.plannedTasks,
        blockers: dto.blockers,
        hoursWorked: dto.hoursWorked,
        notes: dto.notes,
      },
    });
  }

  async myReports(userId: string) {
    return this.prisma.weeklyReport.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
      },
      orderBy: {
        weekStart: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const report = await this.prisma.weeklyReport.findUnique({
      where: {
        id,
      },
      include: {
        project: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  async update(id: string, dto: UpdateReportDto) {
    await this.findOne(id);

    return this.prisma.weeklyReport.update({
      where: {
        id,
      },
      data: {
        ...dto,
        weekStart: dto.weekStart ? new Date(dto.weekStart) : undefined,
        weekEnd: dto.weekEnd ? new Date(dto.weekEnd) : undefined,
      },
    });
  }

  async submit(id: string) {
    await this.findOne(id);

    return this.prisma.weeklyReport.update({
      where: {
        id,
      },
      data: {
        status: ReportStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.weeklyReport.delete({
      where: {
        id,
      },
    });
  }

  async allReports() {
    return this.prisma.weeklyReport.findMany({
      include: {
        user: true,
        project: true,
      },
      orderBy: {
        weekStart: 'desc',
      },
    });
  }
}