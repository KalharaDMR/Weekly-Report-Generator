import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AssignUserDto } from './dto/assign-user.dto';

@Injectable()
export class ProjectAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(dto: AssignUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const project = await this.prisma.project.findUnique({
      where: {
        id: dto.projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const existing = await this.prisma.projectAssignment.findUnique({
      where: {
        userId_projectId: {
          userId: dto.userId,
          projectId: dto.projectId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('User already assigned to this project');
    }

    return this.prisma.projectAssignment.create({
      data: dto,
      include: {
        user: true,
        project: true,
      },
    });
  }

  async getProjectUsers(projectId: string) {
    return this.prisma.projectAssignment.findMany({
      where: {
        projectId,
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
      },
    });
  }

  async getUserProjects(userId: string) {
    return this.prisma.projectAssignment.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.projectAssignment.delete({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return this.prisma.projectAssignment.findMany({
      include: {
        user: true,
        project: true,
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });
  }
}
