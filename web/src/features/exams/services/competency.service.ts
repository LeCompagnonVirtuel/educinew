import type { SupabaseExamRepository } from '../repositories';
import { competencySchema, competencyResultSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface CompetencyServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class CompetencyService {
  constructor(private readonly deps: CompetencyServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const parsed = competencySchema.parse({ ...data, schoolId: this.deps.schoolId });
    const competency = await this.deps.repository.createCompetency(parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'COMPETENCY_CREATE', 'competency', competency.id, undefined, competency);
    logger.info('Competency created', { competencyId: competency.id }, 'exams');
    return competency;
  }

  async update(id: string, data: Record<string, unknown>) {
    const { data: competency, error } = await (this.deps.repository as any).supabase
      .from('competencies')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'COMPETENCY_UPDATE', 'competency', id, undefined, competency);
    return competency;
  }

  async evaluate(data: Record<string, unknown>) {
    const parsed = competencyResultSchema.parse(data);
    const { data: result, error } = await (this.deps.repository as any).supabase
      .from('competency_results')
      .upsert({
        student_id: parsed.studentId,
        competency_id: parsed.competencyId,
        exam_id: parsed.examId,
        score: parsed.score,
        max_score: parsed.maxScore,
        level: parsed.level,
        comment: parsed.comment,
        school_id: this.deps.schoolId,
      }, { onConflict: 'student_id,competency_id,exam_id' })
      .select()
      .single();
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, parsed.studentId, 'COMPETENCY_EVALUATE', 'competency_result', result.id, undefined, result);
    logger.info('Competency evaluated', { competencyId: parsed.competencyId, studentId: parsed.studentId }, 'exams');
    return result;
  }

  async find(subjectId?: string) {
    return this.deps.repository.findCompetencies(this.deps.schoolId, subjectId);
  }

  async findResults(examId: string, studentId?: string) {
    return this.deps.repository.findCompetencyResults(examId, studentId);
  }
}
