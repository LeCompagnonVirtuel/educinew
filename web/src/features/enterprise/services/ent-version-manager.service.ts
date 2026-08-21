// Enterprise Platform Service - VersionManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { VersionManager, VersionManagerCreate } from '@educi/types';
import { EntVersionManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVersionManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVersionManager(schoolId: string, id: string): Promise<VersionManager> {
    const item = await this.repo.findVersionManagerById(schoolId, id);
    if (!item) throw new EntVersionManagerNotFoundError(id);
    return item;
  }
  async listVersionManagers(schoolId: string, filters?: Record<string, unknown>): Promise<VersionManager[]> {
    return this.repo.findAllVersionManagers(schoolId, filters);
  }
  async createVersionManager(schoolId: string, data: VersionManagerCreate): Promise<VersionManager> {
    return this.repo.createVersionManager(schoolId, data);
  }
  async updateVersionManager(schoolId: string, id: string, data: Partial<VersionManagerCreate>): Promise<VersionManager> {
    const existing = await this.repo.findVersionManagerById(schoolId, id);
    if (!existing) throw new EntVersionManagerNotFoundError(id);
    return this.repo.updateVersionManager(schoolId, id, data);
  }
  async deleteVersionManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVersionManagerById(schoolId, id);
    if (!existing) throw new EntVersionManagerNotFoundError(id);
    return this.repo.deleteVersionManager(schoolId, id);
  }
  async countVersionManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVersionManagers(schoolId, filters);
  }
}
