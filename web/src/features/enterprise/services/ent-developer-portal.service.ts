// Enterprise Platform Service - DeveloperPortal
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeveloperPortal, DeveloperPortalCreate } from '@educi/types';
import { EntDeveloperPortalNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeveloperPortalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeveloperPortal(schoolId: string, id: string): Promise<DeveloperPortal> {
    const item = await this.repo.findDeveloperPortalById(schoolId, id);
    if (!item) throw new EntDeveloperPortalNotFoundError(id);
    return item;
  }
  async listDeveloperPortals(schoolId: string, filters?: Record<string, unknown>): Promise<DeveloperPortal[]> {
    return this.repo.findAllDeveloperPortals(schoolId, filters);
  }
  async createDeveloperPortal(schoolId: string, data: DeveloperPortalCreate): Promise<DeveloperPortal> {
    return this.repo.createDeveloperPortal(schoolId, data);
  }
  async updateDeveloperPortal(schoolId: string, id: string, data: Partial<DeveloperPortalCreate>): Promise<DeveloperPortal> {
    const existing = await this.repo.findDeveloperPortalById(schoolId, id);
    if (!existing) throw new EntDeveloperPortalNotFoundError(id);
    return this.repo.updateDeveloperPortal(schoolId, id, data);
  }
  async deleteDeveloperPortal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeveloperPortalById(schoolId, id);
    if (!existing) throw new EntDeveloperPortalNotFoundError(id);
    return this.repo.deleteDeveloperPortal(schoolId, id);
  }
  async countDeveloperPortals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeveloperPortals(schoolId, filters);
  }
}
