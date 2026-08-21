// Enterprise Platform Service - VersionRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { VersionRegistry, VersionRegistryCreate } from '@educi/types';
import { EntVersionRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVersionRegistryServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVersionRegistryService(schoolId: string, id: string): Promise<VersionRegistry> {
    const item = await this.repo.findVersionRegistryServiceById(schoolId, id);
    if (!item) throw new EntVersionRegistryNotFoundError(id);
    return item;
  }
  async listVersionRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<VersionRegistry[]> {
    return this.repo.findAllVersionRegistryServices(schoolId, filters);
  }
  async createVersionRegistryService(schoolId: string, data: VersionRegistryCreate): Promise<VersionRegistry> {
    return this.repo.createVersionRegistryService(schoolId, data);
  }
  async updateVersionRegistryService(schoolId: string, id: string, data: Partial<VersionRegistryCreate>): Promise<VersionRegistry> {
    const existing = await this.repo.findVersionRegistryServiceById(schoolId, id);
    if (!existing) throw new EntVersionRegistryNotFoundError(id);
    return this.repo.updateVersionRegistryService(schoolId, id, data);
  }
  async deleteVersionRegistryService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVersionRegistryServiceById(schoolId, id);
    if (!existing) throw new EntVersionRegistryNotFoundError(id);
    return this.repo.deleteVersionRegistryService(schoolId, id);
  }
  async countVersionRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVersionRegistryServices(schoolId, filters);
  }
}
