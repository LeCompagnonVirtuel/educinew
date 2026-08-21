import type { SupabaseClient } from '@supabase/supabase-js';
import type { CheatingDetection, CheatingDetectionCreate } from '@educi/types';
import { AssessmentCheatingDetectionError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentCheatingDetectionService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getCheatingDetection(schoolId: string, id: string): Promise<CheatingDetection> {
    const item = await this.repo.getCheatingDetection(id, schoolId);
    if (!item) throw new AssessmentCheatingDetectionError(id);
    return item;
  }
  async listCheatingDetections(schoolId: string, filters?: Record<string, unknown>): Promise<CheatingDetection[]> {
    return this.repo.listCheatingDetections(schoolId, filters);
  }
  async createCheatingDetection(schoolId: string, data: CheatingDetectionCreate): Promise<CheatingDetection> {
    return this.repo.createCheatingDetection({ ...data, school_id: schoolId } as any);
  }
  async updateCheatingDetection(schoolId: string, id: string, data: Partial<CheatingDetectionCreate>): Promise<CheatingDetection> {
    const existing = await this.repo.getCheatingDetection(id, schoolId);
    if (!existing) throw new AssessmentCheatingDetectionError(id);
    return this.repo.updateCheatingDetection(id, schoolId, data as any);
  }
  async deleteCheatingDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCheatingDetection(id, schoolId);
    if (!existing) throw new AssessmentCheatingDetectionError(id);
    return this.repo.deleteCheatingDetection(id, schoolId);
  }
}
