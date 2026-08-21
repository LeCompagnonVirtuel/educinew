import type { SupabaseClient } from '@supabase/supabase-js';
import type { VirtualLab } from '@educi/types';
import { AdaptiveVirtualLabNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveVirtualLabService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getVirtualLab(schoolId: string, id: string): Promise<VirtualLab> {
    const item = await this.repo.getVirtualLab(schoolId, id);
    if (!item) throw new AdaptiveVirtualLabNotFoundError(id);
    return item;
  }
  async listVirtualLabs(schoolId: string, filters?: Record<string, unknown>): Promise<VirtualLab[]> {
    return this.repo.listVirtualLabs(schoolId, filters);
  }
  async createVirtualLab(schoolId: string, data: Omit<VirtualLab, 'id' | 'created_at'>): Promise<VirtualLab> {
    return this.repo.createVirtualLab(schoolId, data);
  }
  async updateVirtualLab(schoolId: string, id: string, data: Partial<Omit<VirtualLab, 'id' | 'created_at'>>): Promise<VirtualLab> {
    const existing = await this.repo.getVirtualLab(schoolId, id);
    if (!existing) throw new AdaptiveVirtualLabNotFoundError(id);
    return this.repo.updateVirtualLab(schoolId, id, data);
  }
  async deleteVirtualLab(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVirtualLab(schoolId, id);
    if (!existing) throw new AdaptiveVirtualLabNotFoundError(id);
    return this.repo.deleteVirtualLab(schoolId, id);
  }
}
