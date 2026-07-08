import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '@prisma/client';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  summary() {
    return this.dashboardService.getSummary();
  }

  @Get('activity')
  activity() {
    return this.dashboardService.getRecentActivity();
  }

  @Get('charts')
  charts() {
    return this.dashboardService.getCharts();
  }

  @Get('reports')
  reports(@Query() query: any) {
    return this.dashboardService.getReports(query);
  }
}