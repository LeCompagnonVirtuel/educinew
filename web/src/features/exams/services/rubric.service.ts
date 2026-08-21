import type { SupabaseExamRepository } from '../repositories';
import { logger } from '@educi/logger';

interface RubricServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class RubricService {
  constructor(private readonly deps: RubricServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const { data: rubric, error } = await (this.deps.repository as any).supabase
      .from('rubrics')
      .insert({ ...data, school_id: this.deps.schoolId })
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RUBRIC_CREATE', 'rubric', rubric.id, undefined, rubric);
    logger.info('Rubric created', { rubricId: rubric.id }, 'exams');
    return rubric;
  }

  async update(id: string, data: Record<string, unknown>) {
    const { data: rubric, error } = await (this.deps.repository as any).supabase
      .from('rubrics')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RUBRIC_UPDATE', 'rubric', id, undefined, rubric);
    return rubric;
  }

  async delete(id: string) {
    const { error } = await (this.deps.repository as any).supabase
      .from('rubrics')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RUBRIC_DELETE', 'rubric', id, undefined, undefined);
  }

  async evaluate(data: Record<string, unknown>) {
    const { data: result, error } = await (this.deps.repository as any).supabase
      .from('rubric_evaluations')
      .insert({ ...data, school_id: this.deps.schoolId })
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'RUBRIC_EVALUATE', 'rubric_evaluation', result.id, undefined, result);
    logger.info('Rubric evaluated', { rubricId: data.rubricId, studentId: data.studentId }, 'exams');
    return result;
  }

  async findById(id: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('rubrics')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    return data;
  }

  async findBySchool(subjectId?: string) {
    let query = (this.deps.repository as any).supabase
      .from('rubrics')
      .select('*')
      .eq('school_id', this.deps.schoolId);
    if (subjectId) query = query.eq('subject_id', subjectId);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async findEvaluations(rubricId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('rubric_evaluations')
      .select('*')
      .eq('rubric_id', rubricId);
    if (error) throw error;
    return data || [];
  }
}
