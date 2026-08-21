import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalDiploma, DigitalDiplomaCreate } from '@educi/types';
import { AssessmentDigitalDiplomaError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentDigitalDiplomaService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getDigitalDiploma(schoolId: string, id: string): Promise<DigitalDiploma> {
    const item = await this.repo.getDigitalDiploma(id, schoolId);
    if (!item) throw new AssessmentDigitalDiplomaError(id);
    return item;
  }
  async listDigitalDiplomas(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalDiploma[]> {
    return this.repo.listDigitalDiplomas(schoolId, filters);
  }
  async createDigitalDiploma(schoolId: string, data: DigitalDiplomaCreate): Promise<DigitalDiploma> {
    return this.repo.createDigitalDiploma({ ...data, school_id: schoolId } as any);
  }
  async updateDigitalDiploma(schoolId: string, id: string, data: Partial<DigitalDiplomaCreate>): Promise<DigitalDiploma> {
    const existing = await this.repo.getDigitalDiploma(id, schoolId);
    if (!existing) throw new AssessmentDigitalDiplomaError(id);
    return this.repo.updateDigitalDiploma(id, schoolId, data as any);
  }
  async deleteDigitalDiploma(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDigitalDiploma(id, schoolId);
    if (!existing) throw new AssessmentDigitalDiplomaError(id);
    return this.repo.deleteDigitalDiploma(id, schoolId);
  }
}
