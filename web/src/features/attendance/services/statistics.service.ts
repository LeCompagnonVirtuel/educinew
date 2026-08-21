import type { AttendanceRepository, AttendanceStatistics, AttendanceFilters } from '../types';
import { logger } from '@educi/logger';

export class AttendanceStatisticsService {
  constructor(private readonly repo: AttendanceRepository) {}

  async getOverview(schoolId: string, academicYearId: string): Promise<AttendanceStatistics> {
    logger.info('Getting attendance statistics overview', { schoolId }, 'attendance');
    return this.repo.getStatistics(schoolId, academicYearId);
  }

  async getDailyStats(schoolId: string, date: string): Promise<AttendanceStatistics> {
    logger.info('Getting daily attendance stats', { schoolId, date }, 'attendance');
    return this.repo.getStatistics(schoolId, '', date);
  }

  async getWeeklyStats(schoolId: string, startDate: string): Promise<AttendanceStatistics[]> {
    const stats: AttendanceStatistics[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      stats.push(await this.repo.getStatistics(schoolId, '', date.toISOString().split('T')[0]));
    }
    return stats;
  }

  async getMonthlyStats(schoolId: string, month: string, year: number): Promise<AttendanceStatistics[]> {
    const stats: AttendanceStatistics[] = [];
    const daysInMonth = new Date(year, parseInt(month), 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${month}-${String(i).padStart(2, '0')}`;
      stats.push(await this.repo.getStatistics(schoolId, '', date));
    }
    return stats;
  }

  async getByClass(schoolId: string, classId: string, date: string): Promise<{ total: number; present: number; absent: number; late: number }> {
    return this.repo.countByClassAndDate(schoolId, classId, date);
  }

  async getByLevel(schoolId: string, academicYearId: string): Promise<AttendanceStatistics> {
    return this.repo.getStatistics(schoolId, academicYearId);
  }

  async getTrends(schoolId: string, academicYearId: string): Promise<AttendanceStatistics> {
    return this.repo.getStatistics(schoolId, academicYearId);
  }
}
