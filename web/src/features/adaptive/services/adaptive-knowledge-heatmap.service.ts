import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeHeatmap, KnowledgeHeatmapCreate } from '@educi/types';
import { AdaptiveKnowledgeHeatmapNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveKnowledgeHeatmapService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getHeatmap(schoolId: string, id: string): Promise<KnowledgeHeatmap> {
    const item = await this.repo.getKnowledgeHeatmap(schoolId, id);
    if (!item) throw new AdaptiveKnowledgeHeatmapNotFoundError(id);
    return item;
  }
  async listHeatmaps(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeHeatmap[]> {
    return this.repo.listKnowledgeHeatmaps(schoolId, filters);
  }
  async createHeatmap(schoolId: string, data: KnowledgeHeatmapCreate): Promise<KnowledgeHeatmap> {
    return this.repo.createKnowledgeHeatmap(schoolId, data);
  }
  async updateHeatmap(schoolId: string, id: string, data: Partial<KnowledgeHeatmapCreate>): Promise<KnowledgeHeatmap> {
    const existing = await this.repo.getKnowledgeHeatmap(schoolId, id);
    if (!existing) throw new AdaptiveKnowledgeHeatmapNotFoundError(id);
    return this.repo.updateKnowledgeHeatmap(schoolId, id, data);
  }
  async deleteHeatmap(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getKnowledgeHeatmap(schoolId, id);
    if (!existing) throw new AdaptiveKnowledgeHeatmapNotFoundError(id);
    return this.repo.deleteKnowledgeHeatmap(schoolId, id);
  }
}
