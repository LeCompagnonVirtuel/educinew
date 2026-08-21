import type { SupabaseExamRepository } from '../repositories';
import { examAuditSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface AuditServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class AuditService {
  constructor(private readonly deps: AuditServiceDeps) {}

  async log(action: string, entityType: string, entityId: string, userId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>) {
    await this.deps.repository.logAudit(this.deps.schoolId, userId, action, entityType, entityId, previousValue, newValue);
    logger.audit(`${action} on ${entityType} ${entityId}`, { userId, entityType, entityId }, 'exams');
  }

  async getAuditLog(filters?: Record<string, unknown>) {
    const parsed = filters ? examAuditSchema.parse({ ...filters, schoolId: this.deps.schoolId }) : {};
    return this.deps.repository.getAuditLog(this.deps.schoolId, {
      exam_id: parsed.examId,
      user_id: parsed.userId,
      action: parsed.action,
      entity_type: parsed.entityType,
      limit: parsed.limit || 50,
      offset: parsed.offset || 0,
    });
  }

  async getExamAudit(examId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_audit_logs')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .eq('entity_id', examId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async getUserAudit(userId: string, limit = 50) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_audit_logs')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }

  async getRecentActivity(limit = 20) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_audit_logs')
      .select('*')
      .eq('school_id', this.deps.schoolId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  }
}
