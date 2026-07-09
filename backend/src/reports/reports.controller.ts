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

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ReviewReportDto } from './dto/review-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';

import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiBearerAuth()
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

  @Roles(Role.ADMIN, Role.MANAGER)
@Patch(':id/review')
review(
  @Param('id') id: string,
  @CurrentUser() user: any,
  @Body() dto: ReviewReportDto,
) {
  return this.reportsService.review(
    id,
    user.id,
    dto.feedback,
  );
}

@Roles(Role.ADMIN, Role.MANAGER)
@Patch(':id/approve')
approve(
  @Param('id') id: string,
  @CurrentUser() user: any,
  @Body() dto: ApproveReportDto,
) {
  return this.reportsService.approve(
    id,
    user.id,
    dto.feedback,
  );
}
}