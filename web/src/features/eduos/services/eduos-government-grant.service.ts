import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernmentGrant } from '@educi/types';
import { EduOSGovernmentGrantError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSGovernmentGrantService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getGovernmentGrant(schoolId: string, id: string): Promise<GovernmentGrant> {
    const item = await this.repo.getGovernmentGrant(schoolId, id);
    if (!item) throw new EduOSGovernmentGrantError(id);
    return item;
  }
  async listGovernmentGrants(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentGrant[]> {
    return this.repo.listGovernmentGrants(schoolId, filters);
  }
  async createGovernmentGrant(schoolId: string, data: Partial<GovernmentGrant>): Promise<GovernmentGrant> {
    return this.repo.createGovernmentGrant(schoolId, data as any);
  }
  async updateGovernmentGrant(schoolId: string, id: string, data: Partial<GovernmentGrant>): Promise<GovernmentGrant> {
    const existing = await this.repo.getGovernmentGrant(schoolId, id);
    if (!existing) throw new EduOSGovernmentGrantError(id);
    return this.repo.updateGovernmentGrant(schoolId, id, data as any);
  }
  async deleteGovernmentGrant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGovernmentGrant(schoolId, id);
    if (!existing) throw new EduOSGovernmentGrantError(id);
    return this.repo.deleteGovernmentGrant(schoolId, id);
  }
}

