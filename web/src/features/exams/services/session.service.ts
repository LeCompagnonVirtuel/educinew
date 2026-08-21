import type { SupabaseExamRepository } from '../repositories';
import { examSessionSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface SessionServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class SessionService {
  constructor(private readonly deps: SessionServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const parsed = examSessionSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const { data: session, error } = await (this.deps.repository as any).supabase
      .from('exam_sessions')
      .insert(parsed)
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'SESSION_CREATE', 'exam_session', session.id, undefined, session);
    logger.info('Exam session created', { sessionId: session.id }, 'exams');
    return session;
  }

  async update(id: string, data: Record<string, unknown>) {
    const { data: session, error } = await (this.deps.repository as any).supabase
      .from('exam_sessions')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'SESSION_UPDATE', 'exam_session', id, undefined, session);
    return session;
  }

  async delete(id: string) {
    const { error } = await (this.deps.repository as any).supabase
      .from('exam_sessions')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'SESSION_DELETE', 'exam_session', id, undefined, undefined);
    logger.info('Exam session deleted', { sessionId: id }, 'exams');
  }

  async findById(id: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_sessions')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findByExam(examId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('exam_sessions')
      .select('*')
      .eq('exam_id', examId)
      .order('date');
    if (error) throw error;
    return data || [];
  }
}
