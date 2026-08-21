import type { AttendanceRepository, AttendanceAlert } from '../types';
import { logger } from '@educi/logger';
import { ATTENDANCE_THRESHOLDS } from '@educi/config';

export class AttendanceAlertService {
  constructor(private readonly repo: AttendanceRepository) {}

  async checkConsecutiveAbsences(schoolId: string, studentId: string): Promise<AttendanceAlert | null> {
    const count = await this.repo.getConsecutiveAbsences(schoolId, studentId);
    if (count >= ATTENDANCE_THRESHOLDS.CONSECUTIVE_ABSENCE_ALERT) {
      const severity = count >= 5 ? 'CRITICAL' : count >= 3 ? 'HIGH' : 'MEDIUM';
      return this.repo.createAlert({
        schoolId, alertType: 'CONSECUTIVE_ABSENCE', severity,
        title: 'Absences consécutives', message: `${count} absences consécutives détectées`,
        targetType: 'STUDENT', targetId: studentId, resolved: false,
      });
    }
    return null;
  }

  async checkLowAttendance(schoolId: string, studentId: string, startDate: string, endDate: string): Promise<AttendanceAlert | null> {
    const rate = await this.repo.getAttendanceRate(schoolId, studentId, startDate, endDate);
    if (rate < ATTENDANCE_THRESHOLDS.LOW_ATTENDANCE_RATE) {
      return this.repo.createAlert({
        schoolId, alertType: 'LOW_ATTENDANCE', severity: 'HIGH',
        title: 'Faible taux de présence', message: `Taux de présence: ${rate}%`,
        targetType: 'STUDENT', targetId: studentId, resolved: false,
      });
    }
    return null;
  }

  async checkFrequentLate(schoolId: string, studentId: string): Promise<AttendanceAlert | null> {
    return null;
  }

  async checkClassLowRate(schoolId: string, classId: string): Promise<AttendanceAlert | null> {
    return null;
  }

  async checkTeacherAbsence(schoolId: string, teacherId: string): Promise<AttendanceAlert | null> {
    return null;
  }

  async getAlerts(schoolId: string): Promise<AttendanceAlert[]> {
    return this.repo.findAlerts(schoolId);
  }

  async resolveAlert(id: string, resolvedBy: string): Promise<void> {
    return this.repo.resolveAlert(id, resolvedBy);
  }
}
