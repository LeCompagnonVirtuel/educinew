import type { SupabaseClient } from '@supabase/supabase-js';
import type { Avatar } from '@educi/types';
import { AdaptiveAvatarError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAvatarService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getAvatar(schoolId: string, id: string): Promise<Avatar> {
    const item = await this.repo.getAvatar(schoolId, id);
    if (!item) throw new AdaptiveAvatarError(id);
    return item;
  }
  async listAvatars(schoolId: string, filters?: Record<string, unknown>): Promise<Avatar[]> {
    return this.repo.listAvatars(schoolId, filters);
  }
  async createAvatar(schoolId: string, data: Omit<Avatar, 'id' | 'created_at'>): Promise<Avatar> {
    return this.repo.createAvatar(schoolId, data);
  }
  async updateAvatar(schoolId: string, id: string, data: Partial<Omit<Avatar, 'id' | 'created_at'>>): Promise<Avatar> {
    const existing = await this.repo.getAvatar(schoolId, id);
    if (!existing) throw new AdaptiveAvatarError(id);
    return this.repo.updateAvatar(schoolId, id, data);
  }
  async deleteAvatar(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAvatar(schoolId, id);
    if (!existing) throw new AdaptiveAvatarError(id);
    return this.repo.deleteAvatar(schoolId, id);
  }
}
