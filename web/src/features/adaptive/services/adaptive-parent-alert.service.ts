import type { SupabaseClient } from '@supabase/supabase-js';
import type { ParentAlert } from '@educi/types';
import { AdaptiveParentAlertError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveParentAlertService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getParentAlert(schoolId: string, id: string): Promise<ParentAlert> {
    const item = await this.repo.getParentAlert(schoolId, id);
    if (!item) throw new AdaptiveParentAlertError(id);
    return item;
  }
  async listParentAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<ParentAlert[]> {
    return this.repo.listParentAlerts(schoolId, filters);
  }
  async createParentAlert(schoolId: string, data: Omit<ParentAlert, 'id' | 'created_at'>): Promise<ParentAlert> {
    return this.repo.createParentAlert(schoolId, data);
  }
  async updateParentAlert(schoolId: string, id: string, data: Partial<Omit<ParentAlert, 'id' | 'created_at'>>): Promise<ParentAlert> {
    const existing = await this.repo.getParentAlert(schoolId, id);
    if (!existing) throw new AdaptiveParentAlertError(id);
    return this.repo.updateParentAlert(schoolId, id, data);
  }
  async deleteParentAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getParentAlert(schoolId, id);
    if (!existing) throw new AdaptiveParentAlertError(id);
    return this.repo.deleteParentAlert(schoolId, id);
  }
}
