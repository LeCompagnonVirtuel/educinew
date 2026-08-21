import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudPlugin } from '@educi/types';
import { EduCloudCloudPluginError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudPlugin {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudPlugin(schoolId: string, id: string): Promise<CloudPlugin> {
    const item = await this.repo.getCloudPlugin(schoolId, id);
    if (!item) throw new EduCloudCloudPluginError(id);
    return item;
  }
  async listCloudPlugins(schoolId: string, filters?: Record<string, unknown>): Promise<CloudPlugin[]> {
    return this.repo.listCloudPlugin(schoolId, filters);
  }
  async createCloudPlugin(schoolId: string, data: Partial<CloudPlugin>): Promise<CloudPlugin> {
    return this.repo.createCloudPlugin(schoolId, data as any);
  }
  async updateCloudPlugin(schoolId: string, id: string, data: Partial<CloudPlugin>): Promise<CloudPlugin> {
    const existing = await this.repo.getCloudPlugin(schoolId, id);
    if (!existing) throw new EduCloudCloudPluginError(id);
    return this.repo.updateCloudPlugin(schoolId, id, data as any);
  }
  async deleteCloudPlugin(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudPlugin(schoolId, id);
    if (!existing) throw new EduCloudCloudPluginError(id);
    return this.repo.deleteCloudPlugin(schoolId, id);
  }
}
