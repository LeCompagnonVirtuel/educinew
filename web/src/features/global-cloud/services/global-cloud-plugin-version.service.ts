import type { SupabaseClient } from '@supabase/supabase-js';
import type { PluginVersion } from '@educi/types';
import { EduCloudPluginVersionError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudPluginVersion {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getPluginVersion(schoolId: string, id: string): Promise<PluginVersion> {
    const item = await this.repo.getPluginVersion(schoolId, id);
    if (!item) throw new EduCloudPluginVersionError(id);
    return item;
  }
  async listPluginVersions(schoolId: string, filters?: Record<string, unknown>): Promise<PluginVersion[]> {
    return this.repo.listPluginVersion(schoolId, filters);
  }
  async createPluginVersion(schoolId: string, data: Partial<PluginVersion>): Promise<PluginVersion> {
    return this.repo.createPluginVersion(schoolId, data as any);
  }
  async updatePluginVersion(schoolId: string, id: string, data: Partial<PluginVersion>): Promise<PluginVersion> {
    const existing = await this.repo.getPluginVersion(schoolId, id);
    if (!existing) throw new EduCloudPluginVersionError(id);
    return this.repo.updatePluginVersion(schoolId, id, data as any);
  }
  async deletePluginVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPluginVersion(schoolId, id);
    if (!existing) throw new EduCloudPluginVersionError(id);
    return this.repo.deletePluginVersion(schoolId, id);
  }
}
