import type { AttendanceRepository, AttendanceDashboard } from '../types';
import { logger } from '@educi/logger';

export class AttendanceDashboardService {
  constructor(private readonly repo: AttendanceRepository) {}

  async getDashboard(schoolId: string, date?: string): Promise<AttendanceDashboard> {
    logger.info('Getting attendance dashboard', { schoolId }, 'attendance');
    return this.repo.getDashboard(schoolId, date);
  }

  async getMostAssiduousClass(schoolId: string, academicYearId: string): Promise<{ classId: string; className: string; rate: number }> {
    const stats = await this.repo.getStatistics(schoolId, academicYearId);
    if (stats.byClass.length === 0) return { classId: '', className: '', rate: 0 };
    return stats.byClass.reduce((best, current) => current.rate > best.rate ? current : best);
  }

  async getLeastAssiduousClass(schoolId: string, academicYearId: string): Promise<{ classId: string; className: string; rate: number }> {
    const stats = await this.repo.getStatistics(schoolId, academicYearId);
    if (stats.byClass.length === 0) return { classId: '', className: '', rate: 0 };
    return stats.byClass.reduce((worst, current) => current.rate < worst.rate ? current : worst);
  }

  async getAtRiskStudents(schoolId: string, academicYearId: string): Promise<Array<{ studentId: string; name: string; rate: number; classId: string }>> {
    return [];
  }

  async getAbsentTeachers(schoolId: string, date?: string): Promise<Array<{ teacherId: string; name: string; subject?: string }>> {
    return [];
  }

  async getMonthlyEvolution(schoolId: string, academicYearId: string): Promise<Array<{ month: string; rate: number }>> {
    return [];
  }

  async getWeeklyHeatmap(schoolId: string, academicYearId: string): Promise<Array<{ day: string; rate: number }>> {
    return [];
  }
}
