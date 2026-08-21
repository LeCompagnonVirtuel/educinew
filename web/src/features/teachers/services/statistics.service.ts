import type { TeacherRepository, TeacherStatistics, TeacherDashboard } from '../types';
import { logger } from '@educi/logger';

export class StatisticsService {
  constructor(private readonly teacherRepo: TeacherRepository) {}

  async getStatistics(schoolId: string): Promise<TeacherStatistics> {
    return this.teacherRepo.getStatistics(schoolId);
  }

  async getDashboard(schoolId: string): Promise<TeacherDashboard> {
    return this.teacherRepo.getDashboard(schoolId);
  }
}
