import type { SupabaseClient } from '@supabase/supabase-js';
import type { CognitiveProfile, CognitiveProfileCreate } from '@educi/types';
import { AdaptiveCognitiveNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCognitiveService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getCognitiveProfile(schoolId: string, id: string): Promise<CognitiveProfile> {
    const item = await this.repo.getCognitiveProfile(schoolId, id);
    if (!item) throw new AdaptiveCognitiveNotFoundError(id);
    return item;
  }
  async listCognitiveProfiles(schoolId: string, filters?: Record<string, unknown>): Promise<CognitiveProfile[]> {
    return this.repo.listCognitiveProfiles(schoolId, filters);
  }
  async createCognitiveProfile(schoolId: string, data: CognitiveProfileCreate): Promise<CognitiveProfile> {
    return this.repo.createCognitiveProfile(schoolId, { ...data } as any);
  }
  async updateCognitiveProfile(schoolId: string, id: string, data: Partial<CognitiveProfileCreate>): Promise<CognitiveProfile> {
    const existing = await this.repo.getCognitiveProfile(schoolId, id);
    if (!existing) throw new AdaptiveCognitiveNotFoundError(id);
    return this.repo.updateCognitiveProfile(schoolId, id, data);
  }
  async deleteCognitiveProfile(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCognitiveProfile(schoolId, id);
    if (!existing) throw new AdaptiveCognitiveNotFoundError(id);
    return this.repo.deleteCognitiveProfile(schoolId, id);
  }
}
