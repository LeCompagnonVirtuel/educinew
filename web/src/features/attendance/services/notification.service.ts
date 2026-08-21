import type { AttendanceRepository, AttendanceNotification } from '../types';
import { AttendanceNotificationError } from '@educi/errors';
import { logger } from '@educi/logger';

export class AttendanceNotificationService {
  constructor(private readonly repo: AttendanceRepository) {}

  async sendAbsenceNotification(schoolId: string, studentId: string, className: string, date: string): Promise<AttendanceNotification> {
    logger.info('Sending absence notification', { schoolId, studentId }, 'attendance');
    return this.repo.createNotification({
      schoolId, notificationType: 'ABSENCE', recipientType: 'PARENT', recipientId: studentId,
      channel: 'IN_APP', title: 'Absence signalée', message: `Votre enfant est absent le ${date} (${className})`, sent: false, read: false,
    });
  }

  async sendLateNotification(schoolId: string, studentId: string, className: string, lateMinutes: number): Promise<AttendanceNotification> {
    return this.repo.createNotification({
      schoolId, notificationType: 'LATE', recipientType: 'PARENT', recipientId: studentId,
      channel: 'IN_APP', title: 'Retard signalé', message: `Votre enfant est en retard de ${lateMinutes} minutes (${className})`, sent: false, read: false,
    });
  }

  async sendJustificationNotification(schoolId: string, studentId: string, status: string): Promise<AttendanceNotification> {
    return this.repo.createNotification({
      schoolId, notificationType: 'JUSTIFICATION', recipientType: 'PARENT', recipientId: studentId,
      channel: 'IN_APP', title: 'Justification', message: `Votre justification a été ${status}`, sent: false, read: false,
    });
  }

  async sendAlertNotification(schoolId: string, recipientId: string, title: string, message: string): Promise<AttendanceNotification> {
    return this.repo.createNotification({
      schoolId, notificationType: 'ALERT', recipientType: 'ADMIN', recipientId,
      channel: 'IN_APP', title, message, sent: false, read: false,
    });
  }

  async sendReminderNotification(schoolId: string, recipientId: string, message: string): Promise<AttendanceNotification> {
    return this.repo.createNotification({
      schoolId, notificationType: 'REMINDER', recipientType: 'TEACHER', recipientId,
      channel: 'IN_APP', title: 'Rappel', message, sent: false, read: false,
    });
  }

  async getNotifications(schoolId: string, recipientId: string): Promise<AttendanceNotification[]> {
    return this.repo.findNotifications(schoolId, recipientId);
  }

  async markRead(id: string): Promise<void> {
    return this.repo.markNotificationRead(id);
  }
}
