// Enterprise Platform Service - VersionRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { VersionRegistry, VersionRegistryCreate } from '@educi/types';
import { EntVersionRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVersionRegistryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVersionRegistry(schoolId: string, id: string): Promise<VersionRegistry> {
    const item = await this.repo.findVersionRegistryById(schoolId, id);
    if (!item) throw new EntVersionRegistryNotFoundError(id);
    return item;
  }
  async listVersionRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<VersionRegistry[]> {
    return this.repo.findAllVersionRegistrys(schoolId, filters);
  }
  async createVersionRegistry(schoolId: string, data: VersionRegistryCreate): Promise<VersionRegistry> {
    return this.repo.createVersionRegistry(schoolId, data);
  }
  async updateVersionRegistry(schoolId: string, id: string, data: Partial<VersionRegistryCreate>): Promise<VersionRegistry> {
    const existing = await this.repo.findVersionRegistryById(schoolId, id);
    if (!existing) throw new EntVersionRegistryNotFoundError(id);
    return this.repo.updateVersionRegistry(schoolId, id, data);
  }
  async deleteVersionRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVersionRegistryById(schoolId, id);
    if (!existing) throw new EntVersionRegistryNotFoundError(id);
    return this.repo.deleteVersionRegistry(schoolId, id);
  }
  async countVersionRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVersionRegistrys(schoolId, filters);
  }
}
