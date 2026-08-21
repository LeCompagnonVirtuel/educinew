// Enterprise Platform Service - DeveloperPortalSandbox
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeveloperSandboxService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeveloperPortalSandbox(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDeveloperPortalSandboxById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDeveloperPortalSandbox(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDeveloperPortalSandbox(schoolId, filters);
  }
  async createDeveloperPortalSandbox(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDeveloperPortalSandbox(schoolId, data);
  }
  async updateDeveloperPortalSandbox(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDeveloperPortalSandboxById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDeveloperPortalSandbox(schoolId, id, data);
  }
  async deleteDeveloperPortalSandbox(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeveloperPortalSandboxById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDeveloperPortalSandbox(schoolId, id);
  }
  async countDeveloperPortalSandbox(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeveloperPortalSandbox(schoolId, filters);
  }
}
