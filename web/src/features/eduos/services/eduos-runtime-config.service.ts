import type { SupabaseClient } from '@supabase/supabase-js';
import type { RuntimeConfig } from '@educi/types';
import { EduOSRuntimeConfigError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRuntimeConfigService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRuntimeConfig(schoolId: string, id: string): Promise<RuntimeConfig> {
    const item = await this.repo.getRuntimeConfig(schoolId, id);
    if (!item) throw new EduOSRuntimeConfigError(id);
    return item;
  }
  async listRuntimeConfigs(schoolId: string, filters?: Record<string, unknown>): Promise<RuntimeConfig[]> {
    return this.repo.listRuntimeConfigs(schoolId, filters);
  }
  async createRuntimeConfig(schoolId: string, data: Partial<RuntimeConfig>): Promise<RuntimeConfig> {
    return this.repo.createRuntimeConfig(schoolId, data as any);
  }
  async updateRuntimeConfig(schoolId: string, id: string, data: Partial<RuntimeConfig>): Promise<RuntimeConfig> {
    const existing = await this.repo.getRuntimeConfig(schoolId, id);
    if (!existing) throw new EduOSRuntimeConfigError(id);
    return this.repo.updateRuntimeConfig(schoolId, id, data as any);
  }
  async deleteRuntimeConfig(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRuntimeConfig(schoolId, id);
    if (!existing) throw new EduOSRuntimeConfigError(id);
    return this.repo.deleteRuntimeConfig(schoolId, id);
  }
}

