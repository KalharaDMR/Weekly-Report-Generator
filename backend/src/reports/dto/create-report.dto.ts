import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  projectId: string;

  @IsDateString()
  weekStart: string;

  @IsDateString()
  weekEnd: string;

  @IsString()
  @IsNotEmpty()
  completedTasks: string;

  @IsString()
  @IsNotEmpty()
  plannedTasks: string;

  @IsOptional()
  @IsString()
  blockers?: string;

  @IsOptional()
  @IsNumber()
  hoursWorked?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}