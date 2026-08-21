import type { SupabaseExamRepository } from '../repositories';
import { gradeSchema, gradeRuleSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface GradeServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class GradeService {
  constructor(private readonly deps: GradeServiceDeps) {}

  async create(gradeData: Record<string, unknown>) {
    const parsed = gradeSchema.parse({ ...gradeData, schoolId: this.deps.schoolId });
    const grade = await this.deps.repository.createGrade(parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'GRADE_CREATE', 'grade', grade.id, undefined, grade);
    logger.info('Grade created', { gradeId: grade.id }, 'exams');
    return grade;
  }

  async update(id: string, gradeData: Record<string, unknown>) {
    const grade = await this.deps.repository.updateGrade(id, gradeData);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'GRADE_UPDATE', 'grade', id, undefined, grade);
    return grade;
  }

  async delete(id: string) {
    const { error } = await (this.deps.repository as any).supabase
      .from('grades')
      .delete()
      .eq('id', id);
    if (error) throw error;
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'GRADE_DELETE', 'grade', id, undefined, undefined);
    logger.info('Grade deleted', { gradeId: id }, 'exams');
  }

  async findAll() {
    return this.deps.repository.findGrades(this.deps.schoolId);
  }

  async findGradeRules() {
    return this.deps.repository.findGradeRules(this.deps.schoolId);
  }

  async createGradeRule(ruleData: Record<string, unknown>) {
    const parsed = gradeRuleSchema.parse({ ...ruleData, schoolId: this.deps.schoolId });
    const rule = await this.deps.repository.createGradeRule(parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'GRADE_RULE_CREATE', 'grade_rule', rule.id, undefined, rule);
    logger.info('Grade rule created', { ruleId: rule.id }, 'exams');
    return rule;
  }
}
