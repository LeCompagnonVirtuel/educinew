import type {
  AttendanceAnalytics, AttendanceFilters, AttendanceStatistics,
  AttendanceRepositoryExtended,
} from '../types';
import { AttendanceValidationError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_ANALYTICS, ATTENDANCE_THRESHOLDS } from '@educi/config';

export class AttendanceAnalyticsService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async getAnalytics(schoolId: string, filters: AttendanceFilters): Promise<AttendanceAnalytics> {
    const startDate = filters.startDate || this.getDefaultStartDate();
    const endDate = filters.endDate || this.getDefaultEndDate();

    const { data: attendances } = await this.attendanceRepo.findAllAttendances(schoolId, {
      ...filters,
      startDate,
      endDate,
      limit: 10000,
    });

    const total = attendances.length;
    const present = attendances.filter((a) => a.status === 'PRESENT').length;
    const absent = attendances.filter((a) => a.status === 'ABSENT').length;
    const late = attendances.filter((a) => a.status === 'LATE').length;
    const excused = attendances.filter((a) => a.status === 'EXCUSED').length;

    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

    const byClassMap = new Map<string, { classId: string; className: string; total: number; present: number }>();
    for (const att of attendances) {
      if (att.classId) {
        const existing = byClassMap.get(att.classId) || {
          classId: att.classId,
          className: att.class?.name || '',
          total: 0,
          present: 0,
        };
        existing.total++;
        if (att.status === 'PRESENT' || att.status === 'LATE') existing.present++;
        byClassMap.set(att.classId, existing);
      }
    }

    const byDayMap = new Map<string, { date: string; total: number; present: number }>();
    for (const att of attendances) {
      const existing = byDayMap.get(att.date) || { date: att.date, total: 0, present: 0 };
      existing.total++;
      if (att.status === 'PRESENT' || att.status === 'LATE') existing.present++;
      byDayMap.set(att.date, existing);
    }

    const byStatusMap = new Map<string, number>();
    for (const att of attendances) {
      byStatusMap.set(att.status, (byStatusMap.get(att.status) || 0) + 1);
    }

    const analytics: AttendanceAnalytics = {
      period: { startDate, endDate },
      total,
      present,
      absent,
      late,
      excused,
      attendanceRate,
      byClass: Array.from(byClassMap.values()).map((c) => ({
        ...c,
        attendanceRate: c.total > 0 ? Math.round((c.present / c.total) * 100) : 0,
      })),
      byDay: Array.from(byDayMap.values()).map((d) => ({
        ...d,
        attendanceRate: d.total > 0 ? Math.round((d.present / d.total) * 100) : 0,
      })),
      byStatus: Array.from(byStatusMap.entries()).map(([status, count]) => ({
        status,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      })),
    };

    logger.info('Attendance analytics retrieved', { schoolId, startDate, endDate, total }, 'attendance');
    return analytics;
  }

  async getTrends(schoolId: string, classId: string, period: 'DAILY' | 'WEEKLY' | 'MONTHLY', startDate: string, endDate: string): Promise<Array<{ date: string; attendanceRate: number; total: number; present: number }>> {
    const { data: attendances } = await this.attendanceRepo.findAllAttendances(schoolId, {
      classId,
      startDate,
      endDate,
      limit: 10000,
    });

    const grouped = new Map<string, { total: number; present: number }>();

    for (const att of attendances) {
      const key = this.getDateKey(att.date, period);
      const existing = grouped.get(key) || { total: 0, present: 0 };
      existing.total++;
      if (att.status === 'PRESENT' || att.status === 'LATE') existing.present++;
      grouped.set(key, existing);
    }

    const trends = Array.from(grouped.entries())
      .map(([date, counts]) => ({
        date,
        attendanceRate: counts.total > 0 ? Math.round((counts.present / counts.total) * 100) : 0,
        total: counts.total,
        present: counts.present,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    logger.info('Attendance trends retrieved', { schoolId, classId, period, startDate, endDate }, 'attendance');
    return trends;
  }

  async getPredictions(schoolId: string, studentId: string): Promise<{
    predictedRate: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    consecutiveAbsences: number;
    recentRate: number;
    trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  }> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    const recentRate = await this.attendanceRepo.getAttendanceRate(schoolId, studentId, thirtyDaysAgo, today);
    const consecutiveAbsences = await this.attendanceRepo.getConsecutiveAbsences(schoolId, studentId);

    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const previousRate = await this.attendanceRepo.getAttendanceRate(schoolId, studentId, sixtyDaysAgo, thirtyDaysAgo);

    let trend: 'IMPROVING' | 'DECLINING' | 'STABLE' = 'STABLE';
    if (recentRate > previousRate + ATTENDANCE_ANALYTICS.IMPROVEMENT_THRESHOLD * 100) {
      trend = 'IMPROVING';
    } else if (recentRate < previousRate - ATTENDANCE_ANALYTICS.IMPROVEMENT_THRESHOLD * 100) {
      trend = 'DECLINING';
    }

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (recentRate < ATTENDANCE_THRESHOLDS.CRITICAL_ATTENDANCE_RATE || consecutiveAbsences >= ATTENDANCE_THRESHOLDS.CONSECUTIVE_ABSENCE_ALERT) {
      riskLevel = 'HIGH';
    } else if (recentRate < ATTENDANCE_THRESHOLDS.LOW_ATTENDANCE_RATE || consecutiveAbsences >= 2) {
      riskLevel = 'MEDIUM';
    }

    const predictedRate = Math.min(100, Math.max(0, recentRate + (trend === 'IMPROVING' ? 2 : trend === 'DECLINING' ? -2 : 0)));

    logger.info('Attendance predictions generated', { schoolId, studentId, riskLevel, trend }, 'attendance');
    return {
      predictedRate,
      riskLevel,
      consecutiveAbsences,
      recentRate,
      trend,
    };
  }

  async getRecommendations(schoolId: string, studentId: string): Promise<string[]> {
    const prediction = await this.getPredictions(schoolId, studentId);
    const recommendations: string[] = [];

    if (prediction.riskLevel === 'HIGH') {
      recommendations.push('Contacter les parents/tuteurs immédiatement');
      recommendations.push('Organiser une réunion avec l\'équipe pédagogique');
      recommendations.push('Mettre en place un plan de suivi personnalisé');
    } else if (prediction.riskLevel === 'MEDIUM') {
      recommendations.push('Envoyer un avertissement aux parents/tuteurs');
      recommendations.push('Proposer un soutien scolaire');
    }

    if (prediction.consecutiveAbsences >= ATTENDANCE_THRESHOLDS.PARENT_NOTIFICATION_AFTER_ABSENCES) {
      recommendations.push('Notifier les parents des absences consécutives');
    }

    if (prediction.trend === 'DECLINING') {
      recommendations.push('Analyser les causes de la baisse de présence');
      recommendations.push('Proposer des activités d\'engagement');
    }

    if (prediction.consecutiveAbsences === 0 && prediction.recentRate >= 90) {
      recommendations.push('Féliciter l\'élève pour sa régularité');
    }

    if (recommendations.length === 0) {
      recommendations.push('Maintenir le suivi régulier');
    }

    logger.info('Attendance recommendations generated', { schoolId, studentId, recommendationCount: recommendations.length }, 'attendance');
    return recommendations;
  }

  private getDefaultStartDate(): string {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  }

  private getDefaultEndDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getDateKey(dateStr: string, period: 'DAILY' | 'WEEKLY' | 'MONTHLY'): string {
    const date = new Date(dateStr);

    if (period === 'DAILY') {
      return dateStr;
    }

    if (period === 'WEEKLY') {
      const dayOfWeek = date.getDay();
      const monday = new Date(date);
      monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
      return monday.toISOString().split('T')[0];
    }

    return dateStr.substring(0, 7);
  }
}
