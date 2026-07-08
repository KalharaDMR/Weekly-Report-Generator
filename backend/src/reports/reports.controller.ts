import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ReportsService } from './reports.service';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { Role } from '@prisma/client';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Roles(Role.TEAM_MEMBER)
  create(@Req() req, @Body() dto: CreateReportDto) {
    return this.reportsService.create(req.user.id, dto);
  }

  @Get('/me')
  @Roles(Role.TEAM_MEMBER)
  myReports(@Req() req) {
    return this.reportsService.myReports(req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  allReports() {
    return this.reportsService.allReports();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.TEAM_MEMBER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReportDto,
  ) {
    return this.reportsService.update(id, dto);
  }

  @Post(':id/submit')
  @Roles(Role.TEAM_MEMBER)
  submit(@Param('id') id: string) {
    return this.reportsService.submit(id);
  }

  @Delete(':id')
  @Roles(Role.TEAM_MEMBER)
  remove(@Param('id') id: string) {
    return this.reportsService.delete(id);
  }
}