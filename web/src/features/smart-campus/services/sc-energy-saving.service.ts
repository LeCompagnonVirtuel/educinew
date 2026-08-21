import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnergySaving, EnergySavingCreate } from '@educi/types';
import { ScEnergySavingNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScEnergySavingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSaving(schoolId: string, id: string): Promise<EnergySaving> {
    const saving = await this.repo.findEnergySavingById(schoolId, id);
    if (!saving) throw new ScEnergySavingNotFoundError(id);
    return saving;
  }

  async listSavings(schoolId: string, filters?: Record<string, unknown>): Promise<EnergySaving[]> {
    return this.repo.findAllEnergySavings(schoolId, filters);
  }

  async createSaving(schoolId: string, data: EnergySavingCreate): Promise<EnergySaving> {
    return this.repo.createEnergySaving(schoolId, data);
  }

  async updateSaving(schoolId: string, id: string, data: Partial<EnergySavingCreate>): Promise<EnergySaving> {
    const existing = await this.repo.findEnergySavingById(schoolId, id);
    if (!existing) throw new ScEnergySavingNotFoundError(id);
    return this.repo.updateEnergySaving(schoolId, id, data);
  }

  async deleteSaving(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnergySavingById(schoolId, id);
    if (!existing) throw new ScEnergySavingNotFoundError(id);
    return this.repo.deleteEnergySaving(schoolId, id);
  }

  async countSavings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnergySavings(schoolId, filters);
  }
}
