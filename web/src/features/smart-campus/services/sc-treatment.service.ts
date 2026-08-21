import type { SupabaseClient } from '@supabase/supabase-js';
import type { Treatment, TreatmentCreate } from '@educi/types';
import { ScTreatmentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScTreatmentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getTreatment(schoolId: string, id: string): Promise<Treatment> {
    const treatment = await this.repo.findTreatmentById(schoolId, id);
    if (!treatment) throw new ScTreatmentNotFoundError(id);
    return treatment;
  }

  async listTreatments(schoolId: string, filters?: Record<string, unknown>): Promise<Treatment[]> {
    return this.repo.findAllTreatments(schoolId, filters);
  }

  async createTreatment(schoolId: string, data: TreatmentCreate): Promise<Treatment> {
    return this.repo.createTreatment(schoolId, data);
  }

  async updateTreatment(schoolId: string, id: string, data: Partial<TreatmentCreate>): Promise<Treatment> {
    const existing = await this.repo.findTreatmentById(schoolId, id);
    if (!existing) throw new ScTreatmentNotFoundError(id);
    return this.repo.updateTreatment(schoolId, id, data);
  }

  async deleteTreatment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTreatmentById(schoolId, id);
    if (!existing) throw new ScTreatmentNotFoundError(id);
    return this.repo.deleteTreatment(schoolId, id);
  }

  async countTreatments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTreatments(schoolId, filters);
  }
}
