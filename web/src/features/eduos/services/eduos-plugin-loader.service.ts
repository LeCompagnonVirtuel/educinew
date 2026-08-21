import type { SupabaseClient } from '@supabase/supabase-js';
import type { PluginLoader } from '@educi/types';
import { EduOSPluginLoaderError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSPluginLoaderService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getPluginLoader(schoolId: string, id: string): Promise<PluginLoader> {
    const item = await this.repo.getPluginLoader(schoolId, id);
    if (!item) throw new EduOSPluginLoaderError(id);
    return item;
  }
  async listPluginLoaders(schoolId: string, filters?: Record<string, unknown>): Promise<PluginLoader[]> {
    return this.repo.listPluginLoaders(schoolId, filters);
  }
  async createPluginLoader(schoolId: string, data: Partial<PluginLoader>): Promise<PluginLoader> {
    return this.repo.createPluginLoader(schoolId, data as any);
  }
  async updatePluginLoader(schoolId: string, id: string, data: Partial<PluginLoader>): Promise<PluginLoader> {
    const existing = await this.repo.getPluginLoader(schoolId, id);
    if (!existing) throw new EduOSPluginLoaderError(id);
    return this.repo.updatePluginLoader(schoolId, id, data as any);
  }
  async deletePluginLoader(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPluginLoader(schoolId, id);
    if (!existing) throw new EduOSPluginLoaderError(id);
    return this.repo.deletePluginLoader(schoolId, id);
  }
}

