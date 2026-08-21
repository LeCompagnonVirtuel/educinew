import type { SupabaseClient } from '@supabase/supabase-js';
import type { MedicalVisit, MedicalVisitCreate } from '@educi/types';
import { ScVisitNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMedicalVisitService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getVisit(schoolId: string, id: string): Promise<MedicalVisit> {
    const visit = await this.repo.findMedicalVisitById(schoolId, id);
    if (!visit) throw new ScVisitNotFoundError(id);
    return visit;
  }

  async listVisits(schoolId: string, filters?: Record<string, unknown>): Promise<MedicalVisit[]> {
    return this.repo.findAllMedicalVisits(schoolId, filters);
  }

  async createVisit(schoolId: string, data: MedicalVisitCreate): Promise<MedicalVisit> {
    return this.repo.createMedicalVisit(schoolId, data);
  }

  async updateVisit(schoolId: string, id: string, data: Partial<MedicalVisitCreate>): Promise<MedicalVisit> {
    const existing = await this.repo.findMedicalVisitById(schoolId, id);
    if (!existing) throw new ScVisitNotFoundError(id);
    return this.repo.updateMedicalVisit(schoolId, id, data);
  }

  async deleteVisit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMedicalVisitById(schoolId, id);
    if (!existing) throw new ScVisitNotFoundError(id);
    return this.repo.deleteMedicalVisit(schoolId, id);
  }

  async countVisits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMedicalVisits(schoolId, filters);
  }
}
