// Enterprise Platform Service - ModuleRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ModuleRegistry, ModuleRegistryCreate } from '@educi/types';
import { EntModuleRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntModuleRegistryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getModuleRegistry(schoolId: string, id: string): Promise<ModuleRegistry> {
    const item = await this.repo.findModuleRegistryById(schoolId, id);
    if (!item) throw new EntModuleRegistryNotFoundError(id);
    return item;
  }
  async listModuleRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<ModuleRegistry[]> {
    return this.repo.findAllModuleRegistrys(schoolId, filters);
  }
  async createModuleRegistry(schoolId: string, data: ModuleRegistryCreate): Promise<ModuleRegistry> {
    return this.repo.createModuleRegistry(schoolId, data);
  }
  async updateModuleRegistry(schoolId: string, id: string, data: Partial<ModuleRegistryCreate>): Promise<ModuleRegistry> {
    const existing = await this.repo.findModuleRegistryById(schoolId, id);
    if (!existing) throw new EntModuleRegistryNotFoundError(id);
    return this.repo.updateModuleRegistry(schoolId, id, data);
  }
  async deleteModuleRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findModuleRegistryById(schoolId, id);
    if (!existing) throw new EntModuleRegistryNotFoundError(id);
    return this.repo.deleteModuleRegistry(schoolId, id);
  }
  async countModuleRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countModuleRegistrys(schoolId, filters);
  }
}
