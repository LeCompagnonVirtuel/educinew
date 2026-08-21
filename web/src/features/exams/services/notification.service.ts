import type { SupabaseExamRepository } from '../repositories';
import { examNotificationSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface NotificationServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class NotificationService {
  constructor(private readonly deps: NotificationServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const parsed = examNotificationSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const notifications = [];

    for (const recipientId of parsed.recipientIds as string[]) {
      const { data: notification, error } = await (this.deps.repository as any).supabase
        .from('exam_notifications')
        .insert({
          school_id: this.deps.schoolId,
          exam_id: parsed.examId || null,
          user_id: recipientId,
          type: parsed.type,
          message: parsed.message,
          scheduled_at: parsed.scheduledAt || null,
          is_read: false,
        })
        .select()
        .single();
      if (!error && notification) notifications.push(notification);
    }

    logger.info('Exam notifications created', { count: notifications.length, type: parsed.type }, 'exams');
    return notifications;
  }

  async find(userId?: string) {
    return this.deps.repository.findNotifications(this.deps.schoolId, userId);
  }

  async markRead(id: string) {
    return this.deps.repository.markNotificationRead(id);
  }

  async markAllRead(userId: string) {
    const { error } = await (this.deps.repository as any).supabase
      .from('exam_notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('is_read', false);
    if (error) throw error;
    logger.info('All notifications marked read', { userId }, 'exams');
  }

  async getUnreadCount(userId: string) {
    const { count, error } = await (this.deps.repository as any).supabase
      .from('exam_notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    if (error) throw error;
    return count || 0;
  }

  async notifyMarkEntry(examId: string, teacherId: string) {
    const exam = await this.deps.repository.findExam(examId);
    if (!exam) return;

    const { data: students } = await this.deps.repository as any;
    const studentsList = await this.deps.repository.findStudentsByClass(exam.class_id);

    for (const student of studentsList) {
      if (student.parent_id) {
        await (this.deps.repository as any).supabase
          .from('exam_notifications')
          .insert({
            school_id: this.deps.schoolId,
            exam_id: examId,
            user_id: student.parent_id,
            type: 'MARK_ENTRY',
            message: `Marks have been entered for ${exam.name}.`,
            is_read: false,
          });
      }
    }
  }
}
