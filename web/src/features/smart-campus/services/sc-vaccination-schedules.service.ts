import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVaccinationSchedulesService {
  private repo: SmartCampusRepositoryEnterprise;
  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }
  async listItems(schoolId: string) { return this.repo.findAll(schoolId); }
  async getItem(schoolId: string, id: string) { return this.repo.findById(schoolId, id); }
  async createItem(schoolId: string, data: Record<string, unknown>) { return this.repo.create(schoolId, data as any); }
  async updateItem(schoolId: string, id: string, data: Record<string, unknown>) { return this.repo.update(schoolId, id, data as any); }
  async deleteItem(schoolId: string, id: string) { return this.repo.delete(schoolId, id); }
}