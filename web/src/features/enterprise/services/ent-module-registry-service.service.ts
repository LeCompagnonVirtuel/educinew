// Enterprise Platform Service - ModuleRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ModuleRegistry, ModuleRegistryCreate } from '@educi/types';
import { EntModuleRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntModuleRegistryServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getModuleRegistryService(schoolId: string, id: string): Promise<ModuleRegistry> {
    const item = await this.repo.findModuleRegistryServiceById(schoolId, id);
    if (!item) throw new EntModuleRegistryNotFoundError(id);
    return item;
  }
  async listModuleRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<ModuleRegistry[]> {
    return this.repo.findAllModuleRegistryServices(schoolId, filters);
  }
  async createModuleRegistryService(schoolId: string, data: ModuleRegistryCreate): Promise<ModuleRegistry> {
    return this.repo.createModuleRegistryService(schoolId, data);
  }
  async updateModuleRegistryService(schoolId: string, id: string, data: Partial<ModuleRegistryCreate>): Promise<ModuleRegistry> {
    const existing = await this.repo.findModuleRegistryServiceById(schoolId, id);
    if (!existing) throw new EntModuleRegistryNotFoundError(id);
    return this.repo.updateModuleRegistryService(schoolId, id, data);
  }
  async deleteModuleRegistryService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findModuleRegistryServiceById(schoolId, id);
    if (!existing) throw new EntModuleRegistryNotFoundError(id);
    return this.repo.deleteModuleRegistryService(schoolId, id);
  }
  async countModuleRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countModuleRegistryServices(schoolId, filters);
  }
}
