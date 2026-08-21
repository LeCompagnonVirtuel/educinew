// Enterprise Platform Service - DeveloperApp
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeveloperApp, DeveloperAppCreate } from '@educi/types';
import { EntDeveloperAppNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeveloperAppService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeveloperApp(schoolId: string, id: string): Promise<DeveloperApp> {
    const item = await this.repo.findDeveloperAppById(schoolId, id);
    if (!item) throw new EntDeveloperAppNotFoundError(id);
    return item;
  }
  async listDeveloperApps(schoolId: string, filters?: Record<string, unknown>): Promise<DeveloperApp[]> {
    return this.repo.findAllDeveloperApps(schoolId, filters);
  }
  async createDeveloperApp(schoolId: string, data: DeveloperAppCreate): Promise<DeveloperApp> {
    return this.repo.createDeveloperApp(schoolId, data);
  }
  async updateDeveloperApp(schoolId: string, id: string, data: Partial<DeveloperAppCreate>): Promise<DeveloperApp> {
    const existing = await this.repo.findDeveloperAppById(schoolId, id);
    if (!existing) throw new EntDeveloperAppNotFoundError(id);
    return this.repo.updateDeveloperApp(schoolId, id, data);
  }
  async deleteDeveloperApp(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeveloperAppById(schoolId, id);
    if (!existing) throw new EntDeveloperAppNotFoundError(id);
    return this.repo.deleteDeveloperApp(schoolId, id);
  }
  async countDeveloperApps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeveloperApps(schoolId, filters);
  }
}
