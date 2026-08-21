import type { SupabaseClient } from '@supabase/supabase-js';
import type { Vaccination, VaccinationCreate } from '@educi/types';
import { ScVaccinationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVaccinationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getVaccination(schoolId: string, id: string): Promise<Vaccination> {
    const vaccination = await this.repo.findVaccinationById(schoolId, id);
    if (!vaccination) throw new ScVaccinationNotFoundError(id);
    return vaccination;
  }

  async listVaccinations(schoolId: string, filters?: Record<string, unknown>): Promise<Vaccination[]> {
    return this.repo.findAllVaccinations(schoolId, filters);
  }

  async createVaccination(schoolId: string, data: VaccinationCreate): Promise<Vaccination> {
    return this.repo.createVaccination(schoolId, data);
  }

  async updateVaccination(schoolId: string, id: string, data: Partial<VaccinationCreate>): Promise<Vaccination> {
    const existing = await this.repo.findVaccinationById(schoolId, id);
    if (!existing) throw new ScVaccinationNotFoundError(id);
    return this.repo.updateVaccination(schoolId, id, data);
  }

  async deleteVaccination(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVaccinationById(schoolId, id);
    if (!existing) throw new ScVaccinationNotFoundError(id);
    return this.repo.deleteVaccination(schoolId, id);
  }

  async countVaccinations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVaccinations(schoolId, filters);
  }
}
