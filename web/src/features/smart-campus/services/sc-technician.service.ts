import type { SupabaseClient } from '@supabase/supabase-js';
import type { Technician, TechnicianCreate } from '@educi/types';
import { ScTechnicianNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScTechnicianService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getTechnician(schoolId: string, id: string): Promise<Technician> {
    const technician = await this.repo.findTechnicianById(schoolId, id);
    if (!technician) throw new ScTechnicianNotFoundError(id);
    return technician;
  }

  async listTechnicians(schoolId: string, filters?: Record<string, unknown>): Promise<Technician[]> {
    return this.repo.findAllTechnicians(schoolId, filters);
  }

  async createTechnician(schoolId: string, data: TechnicianCreate): Promise<Technician> {
    return this.repo.createTechnician(schoolId, data);
  }

  async updateTechnician(schoolId: string, id: string, data: Partial<TechnicianCreate>): Promise<Technician> {
    const existing = await this.repo.findTechnicianById(schoolId, id);
    if (!existing) throw new ScTechnicianNotFoundError(id);
    return this.repo.updateTechnician(schoolId, id, data);
  }

  async deleteTechnician(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTechnicianById(schoolId, id);
    if (!existing) throw new ScTechnicianNotFoundError(id);
    return this.repo.deleteTechnician(schoolId, id);
  }

  async countTechnicians(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTechnicians(schoolId, filters);
  }
}
