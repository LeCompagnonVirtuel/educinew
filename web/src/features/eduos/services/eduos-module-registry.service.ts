import type { SupabaseClient } from '@supabase/supabase-js';
import type { ModuleRegistry } from '@educi/types';
import { EduOSModuleRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSModuleRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getModuleRegistry(schoolId: string, id: string): Promise<ModuleRegistry> {
    const item = await this.repo.getModuleRegistry(schoolId, id);
    if (!item) throw new EduOSModuleRegistryError(id);
    return item;
  }
  async listModuleRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<ModuleRegistry[]> {
    return this.repo.listModuleRegistries(schoolId, filters);
  }
  async createModuleRegistry(schoolId: string, data: Partial<ModuleRegistry>): Promise<ModuleRegistry> {
    return this.repo.createModuleRegistry(schoolId, data as any);
  }
  async updateModuleRegistry(schoolId: string, id: string, data: Partial<ModuleRegistry>): Promise<ModuleRegistry> {
    const existing = await this.repo.getModuleRegistry(schoolId, id);
    if (!existing) throw new EduOSModuleRegistryError(id);
    return this.repo.updateModuleRegistry(schoolId, id, data as any);
  }
  async deleteModuleRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getModuleRegistry(schoolId, id);
    if (!existing) throw new EduOSModuleRegistryError(id);
    return this.repo.deleteModuleRegistry(schoolId, id);
  }
}


