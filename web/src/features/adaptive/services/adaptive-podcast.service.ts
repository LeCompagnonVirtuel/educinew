import type { SupabaseClient } from '@supabase/supabase-js';
import type { Podcast } from '@educi/types';
import { AdaptivePodcastNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptivePodcastService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getPodcast(schoolId: string, id: string): Promise<Podcast> {
    const item = await this.repo.getPodcast(schoolId, id);
    if (!item) throw new AdaptivePodcastNotFoundError(id);
    return item;
  }
  async listPodcasts(schoolId: string, filters?: Record<string, unknown>): Promise<Podcast[]> {
    return this.repo.listPodcasts(schoolId, filters);
  }
  async createPodcast(schoolId: string, data: Omit<Podcast, 'id' | 'created_at'>): Promise<Podcast> {
    return this.repo.createPodcast(schoolId, data);
  }
  async updatePodcast(schoolId: string, id: string, data: Partial<Omit<Podcast, 'id' | 'created_at'>>): Promise<Podcast> {
    const existing = await this.repo.getPodcast(schoolId, id);
    if (!existing) throw new AdaptivePodcastNotFoundError(id);
    return this.repo.updatePodcast(schoolId, id, data);
  }
  async deletePodcast(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPodcast(schoolId, id);
    if (!existing) throw new AdaptivePodcastNotFoundError(id);
    return this.repo.deletePodcast(schoolId, id);
  }
}
