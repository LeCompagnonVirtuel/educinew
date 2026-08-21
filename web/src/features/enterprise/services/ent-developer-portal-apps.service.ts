// Enterprise Platform Service - DeveloperPortalApps
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeveloperAppService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeveloperPortalApp(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDeveloperPortalAppById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDeveloperPortalApps(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDeveloperPortalApps(schoolId, filters);
  }
  async createDeveloperPortalApp(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDeveloperPortalApp(schoolId, data);
  }
  async updateDeveloperPortalApp(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDeveloperPortalAppById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDeveloperPortalApp(schoolId, id, data);
  }
  async deleteDeveloperPortalApp(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeveloperPortalAppById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDeveloperPortalApp(schoolId, id);
  }
  async countDeveloperPortalApps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeveloperPortalApps(schoolId, filters);
  }
}
