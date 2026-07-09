import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { ProjectAssignmentsController } from './project-assignments.controller';
import { ProjectAssignmentsService } from './project-assignments.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectAssignmentsController],
  providers: [ProjectAssignmentsService],
  exports: [ProjectAssignmentsService],
})
export class ProjectAssignmentsModule {}