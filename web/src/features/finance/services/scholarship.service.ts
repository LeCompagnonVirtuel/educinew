import { SupabaseFinanceRepository } from '../repositories/finance.repository';
import { logger } from '@educi/logger';

export class ScholarshipService {
  constructor(
    private readonly repository: SupabaseFinanceRepository,
    private readonly schoolId: string,
  ) {}

  async findScholarship(id: string) {
    const scholarship = await this.repository.findScholarshipById(id);
    if (!scholarship) {
      logger.warn('Scholarship not found', { scholarshipId: id }, 'finance');
    }
    return scholarship;
  }

  async findAllScholarships(academicYearId?: string) {
    return this.repository.listScholarships(this.schoolId, academicYearId);
  }

  async createScholarship(data: Record<string, unknown>) {
    const scholarship = await this.repository.createScholarship({ ...data, school_id: this.schoolId });
    logger.info('Scholarship created', { scholarshipId: scholarship.id }, 'finance');
    return scholarship;
  }

  async updateScholarship(id: string, data: Record<string, unknown>) {
    const scholarship = await this.repository.updateScholarship(id, data);
    logger.info('Scholarship updated', { scholarshipId: id }, 'finance');
    return scholarship;
  }

  async deleteScholarship(id: string) {
    await this.repository.deleteScholarship(id);
    logger.info('Scholarship deleted', { scholarshipId: id }, 'finance');
  }
}
