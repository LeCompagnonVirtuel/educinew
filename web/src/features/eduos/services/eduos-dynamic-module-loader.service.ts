import type { SupabaseClient } from '@supabase/supabase-js';
import type { DynamicModuleLoader } from '@educi/types';
import { EduOSDynamicModuleLoaderError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDynamicModuleLoaderService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDynamicModuleLoader(schoolId: string, id: string): Promise<DynamicModuleLoader> {
    const item = await this.repo.getDynamicModuleLoader(schoolId, id);
    if (!item) throw new EduOSDynamicModuleLoaderError(id);
    return item;
  }
  async listDynamicModuleLoaders(schoolId: string, filters?: Record<string, unknown>): Promise<DynamicModuleLoader[]> {
    return this.repo.listDynamicModuleLoaders(schoolId, filters);
  }
  async createDynamicModuleLoader(schoolId: string, data: Partial<DynamicModuleLoader>): Promise<DynamicModuleLoader> {
    return this.repo.createDynamicModuleLoader(schoolId, data as any);
  }
  async updateDynamicModuleLoader(schoolId: string, id: string, data: Partial<DynamicModuleLoader>): Promise<DynamicModuleLoader> {
    const existing = await this.repo.getDynamicModuleLoader(schoolId, id);
    if (!existing) throw new EduOSDynamicModuleLoaderError(id);
    return this.repo.updateDynamicModuleLoader(schoolId, id, data as any);
  }
  async deleteDynamicModuleLoader(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDynamicModuleLoader(schoolId, id);
    if (!existing) throw new EduOSDynamicModuleLoaderError(id);
    return this.repo.deleteDynamicModuleLoader(schoolId, id);
  }
}

