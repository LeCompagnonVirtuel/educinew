import type { SupabaseExamRepository } from '../repositories';
import { subjectCoefficientSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface CoefficientServiceDeps {
  repository: SupabaseExamRepository;
  schoolId: string;
}

export class CoefficientService {
  constructor(private readonly deps: CoefficientServiceDeps) {}

  async find(classId?: string) {
    return this.deps.repository.findCoefficients(this.deps.schoolId, classId);
  }

  async update(id: string, data: Record<string, unknown>) {
    const parsed = subjectCoefficientSchema.partial().parse(data);
    const coeff = await this.deps.repository.updateCoefficient(id, parsed as Record<string, unknown>);
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'COEFFICIENT_UPDATE', 'subject_coefficient', id, undefined, coeff);
    logger.info('Coefficient updated', { coefficientId: id }, 'exams');
    return coeff;
  }

  async bulkUpdate(updates: Array<{ id: string; coefficient: number; isMain?: boolean }>) {
    const results = [];
    for (const update of updates) {
      const coeff = await this.deps.repository.updateCoefficient(update.id, { coefficient: update.coefficient, is_main: update.isMain });
      results.push(coeff);
    }
    await this.deps.repository.logAudit(this.deps.schoolId, this.deps.schoolId, 'COEFFICIENT_BULK_UPDATE', 'subject_coefficient', this.deps.schoolId, undefined, { count: results.length });
    logger.info('Coefficients bulk updated', { count: results.length }, 'exams');
    return results;
  }
}
