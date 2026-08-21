import type { SupabaseExamRepository } from '../repositories';
import { logger } from '@educi/logger';

interface AssessmentServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class AssessmentService {
  constructor(private readonly deps: AssessmentServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const { data: assessment, error } = await (this.deps.repository as any).supabase
      .from('assessments')
      .insert({ ...data, school_id: this.deps.schoolId })
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'ASSESSMENT_CREATE', 'assessment', assessment.id, undefined, assessment);
    logger.info('Assessment created', { assessmentId: assessment.id }, 'exams');
    return assessment;
  }

  async update(id: string, data: Record<string, unknown>) {
    const { data: assessment, error } = await (this.deps.repository as any).supabase
      .from('assessments')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'ASSESSMENT_UPDATE', 'assessment', id, undefined, assessment);
    return assessment;
  }

  async delete(id: string) {
    const { error } = await (this.deps.repository as any).supabase
      .from('assessments')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'ASSESSMENT_DELETE', 'assessment', id, undefined, undefined);
  }

  async findById(id: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('assessments')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findByExam(examId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('assessments')
      .select('*')
      .eq('exam_id', examId)
      .order('order');
    if (error) throw error;
    return data || [];
  }

  async findByClass(classId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('assessments')
      .select('*')
      .eq('class_id', classId)
      .eq('school_id', this.deps.schoolId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
}
