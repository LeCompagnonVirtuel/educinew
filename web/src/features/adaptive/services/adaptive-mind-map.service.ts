import type { SupabaseClient } from '@supabase/supabase-js';
import type { MindMap } from '@educi/types';
import { AdaptiveMindMapNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMindMapService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getMindMap(schoolId: string, id: string): Promise<MindMap> {
    const item = await this.repo.getMindMap(schoolId, id);
    if (!item) throw new AdaptiveMindMapNotFoundError(id);
    return item;
  }
  async listMindMaps(schoolId: string, filters?: Record<string, unknown>): Promise<MindMap[]> {
    return this.repo.listMindMaps(schoolId, filters);
  }
  async createMindMap(schoolId: string, data: Omit<MindMap, 'id' | 'created_at'>): Promise<MindMap> {
    return this.repo.createMindMap(schoolId, data);
  }
  async updateMindMap(schoolId: string, id: string, data: Partial<Omit<MindMap, 'id' | 'created_at'>>): Promise<MindMap> {
    const existing = await this.repo.getMindMap(schoolId, id);
    if (!existing) throw new AdaptiveMindMapNotFoundError(id);
    return this.repo.updateMindMap(schoolId, id, data);
  }
  async deleteMindMap(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMindMap(schoolId, id);
    if (!existing) throw new AdaptiveMindMapNotFoundError(id);
    return this.repo.deleteMindMap(schoolId, id);
  }
}
