import { ReportStatus } from '@prisma/client';

export function getSubmissionStatus(
  status: ReportStatus,
  weekEnd: Date,
): 'Submitted' | 'Pending' | 'Late' {
  if (status === ReportStatus.SUBMITTED) {
    return 'Submitted';
  }

  const today = new Date();

  if (today > new Date(weekEnd)) {
    return 'Late';
  }

  return 'Pending';
}