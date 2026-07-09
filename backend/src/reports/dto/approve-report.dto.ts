import { IsOptional, IsString } from 'class-validator';

export class ApproveReportDto {
  @IsOptional()
  @IsString()
  feedback?: string;
}