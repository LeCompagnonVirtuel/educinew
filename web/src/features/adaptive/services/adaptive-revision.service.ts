import type { SupabaseClient } from '@supabase/supabase-js';
import type { SmartRevision, SmartRevisionCreate } from '@educi/types';
import { AdaptiveRevisionNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRevisionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getSmartRevision(schoolId: string, id: string): Promise<SmartRevision> {
    const item = await this.repo.getSmartRevision(schoolId, id);
    if (!item) throw new AdaptiveRevisionNotFoundError(id);
    return item;
  }
  async listSmartRevisions(schoolId: string, filters?: Record<string, unknown>): Promise<SmartRevision[]> {
    return this.repo.listSmartRevisions(schoolId, filters);
  }
  async createSmartRevision(schoolId: string, data: SmartRevisionCreate): Promise<SmartRevision> {
    return this.repo.createSmartRevision(schoolId, { ...data } as any);
  }
  async updateSmartRevision(schoolId: string, id: string, data: Partial<SmartRevisionCreate>): Promise<SmartRevision> {
    const existing = await this.repo.getSmartRevision(schoolId, id);
    if (!existing) throw new AdaptiveRevisionNotFoundError(id);
    return this.repo.updateSmartRevision(schoolId, id, data);
  }
  async deleteSmartRevision(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSmartRevision(schoolId, id);
    if (!existing) throw new AdaptiveRevisionNotFoundError(id);
    return this.repo.deleteSmartRevision(schoolId, id);
  }
}
