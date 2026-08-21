import type { StudentRepository, StudentStatistics } from '../types';
import { StudentNotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';

export class StatisticsService {
  constructor(private readonly studentRepo: StudentRepository) {}

  async getStatistics(schoolId: string): Promise<StudentStatistics> {
    return this.studentRepo.getStatistics(schoolId);
  }

  async getDashboard(schoolId: string) {
    return this.studentRepo.getDashboard(schoolId);
  }

  async getAttendanceSummary(studentId: string, academicYearId: string) {
    return this.studentRepo.getAttendanceSummary(studentId, academicYearId);
  }

  async getGradeSummary(studentId: string, academicYearId: string) {
    return this.studentRepo.getGradeSummary(studentId, academicYearId);
  }

  async getPaymentSummary(studentId: string) {
    return this.studentRepo.getPaymentSummary(studentId);
  }
}
