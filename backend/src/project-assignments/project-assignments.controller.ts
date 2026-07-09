import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Role } from '@prisma/client';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { AssignUserDto } from './dto/assign-user.dto';
import { ProjectAssignmentsService } from './project-assignments.service';

import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Assignments')
@ApiBearerAuth()
@Controller('project-assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectAssignmentsController {
  constructor(
    private readonly projectAssignmentsService: ProjectAssignmentsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  assign(@Body() dto: AssignUserDto) {
    return this.projectAssignmentsService.assign(dto);
  }

  @Get('project/:projectId')
  @Roles(Role.ADMIN, Role.MANAGER)
  getProjectUsers(@Param('projectId') projectId: string) {
    return this.projectAssignmentsService.getProjectUsers(projectId);
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN, Role.MANAGER)
  getUserProjects(@Param('userId') userId: string) {
    return this.projectAssignmentsService.getUserProjects(userId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  remove(@Param('id') id: string) {
    return this.projectAssignmentsService.remove(id);
  }
}