import type { SupabaseClient } from '@supabase/supabase-js';
import type { Accident, AccidentCreate } from '@educi/types';
import { ScAccidentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAccidentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAccident(schoolId: string, id: string): Promise<Accident> {
    const accident = await this.repo.findAccidentById(schoolId, id);
    if (!accident) throw new ScAccidentNotFoundError(id);
    return accident;
  }

  async listAccidents(schoolId: string, filters?: Record<string, unknown>): Promise<Accident[]> {
    return this.repo.findAllAccidents(schoolId, filters);
  }

  async createAccident(schoolId: string, data: AccidentCreate): Promise<Accident> {
    return this.repo.createAccident(schoolId, data);
  }

  async updateAccident(schoolId: string, id: string, data: Partial<AccidentCreate>): Promise<Accident> {
    const existing = await this.repo.findAccidentById(schoolId, id);
    if (!existing) throw new ScAccidentNotFoundError(id);
    return this.repo.updateAccident(schoolId, id, data);
  }

  async deleteAccident(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccidentById(schoolId, id);
    if (!existing) throw new ScAccidentNotFoundError(id);
    return this.repo.deleteAccident(schoolId, id);
  }

  async countAccidents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccidents(schoolId, filters);
  }
}
