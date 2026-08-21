import type { SupabaseExamRepository } from '../repositories';
import { decisionSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface DecisionServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class DecisionService {
  constructor(private readonly deps: DecisionServiceDeps) {}

  async create(data: Record<string, unknown>) {
    const parsed = decisionSchema.parse({ ...data, schoolId: this.deps.schoolId });
    const decision = await this.deps.repository.createDecision(parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, parsed.studentId as string, 'DECISION_CREATE', 'decision', decision.id, undefined, decision);
    logger.info('Decision created', { decisionId: decision.id }, 'exams');
    return decision;
  }

  async approve(id: string, approvedBy: string) {
    const existing = await this.deps.repository.findDecision(id);
    if (!existing) throw new Error('Decision not found');
    const decision = await this.deps.repository.approveDecision(id, approvedBy);
    await this.deps.repository.logAudit(this.deps.schoolId, approvedBy, 'DECISION_APPROVE', 'decision', id, existing, decision);
    logger.info('Decision approved', { decisionId: id }, 'exams');
    return decision;
  }

  async findById(id: string) {
    const decision = await this.deps.repository.findDecision(id);
    if (!decision) throw new Error('Decision not found');
    return decision;
  }

  async findByClass(classId: string, termId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('decisions')
      .select('*')
      .eq('class_id', classId)
      .eq('term_id', termId)
      .eq('school_id', this.deps.schoolId);
    if (error) throw error;
    return data || [];
  }

  async findByStudent(studentId: string, academicYearId: string) {
    const { data, error } = await (this.deps.repository as any).supabase
      .from('decisions')
      .select('*')
      .eq('student_id', studentId)
      .eq('academic_year_id', academicYearId)
      .eq('school_id', this.deps.schoolId);
    if (error) throw error;
    return data || [];
  }
}
