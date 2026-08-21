import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicRisk, AcademicRiskCreate } from '@educi/types';
import { AdaptiveAcademicRiskNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAcademicRiskService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAcademicRisk(schoolId: string, id: string): Promise<AcademicRisk> {
    const item = await this.repo.getAcademicRisk(schoolId, id);
    if (!item) throw new AdaptiveAcademicRiskNotFoundError(id);
    return item;
  }
  async listAcademicRisks(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicRisk[]> {
    return this.repo.listAcademicRisks(schoolId, filters);
  }
  async createAcademicRisk(schoolId: string, data: AcademicRiskCreate): Promise<AcademicRisk> {
    return this.repo.createAcademicRisk(schoolId, { ...data } as any);
  }
  async updateAcademicRisk(schoolId: string, id: string, data: Partial<AcademicRiskCreate>): Promise<AcademicRisk> {
    const existing = await this.repo.getAcademicRisk(schoolId, id);
    if (!existing) throw new AdaptiveAcademicRiskNotFoundError(id);
    return this.repo.updateAcademicRisk(schoolId, id, data);
  }
  async deleteAcademicRisk(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAcademicRisk(schoolId, id);
    if (!existing) throw new AdaptiveAcademicRiskNotFoundError(id);
    return this.repo.deleteAcademicRisk(schoolId, id);
  }
}
