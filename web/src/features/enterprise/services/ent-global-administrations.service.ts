// Enterprise Platform Service - GlobalAdministrations
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGlobalAdministrationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGlobalAdministration(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findGlobalAdministrationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listGlobalAdministrations(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllGlobalAdministrations(schoolId, filters);
  }
  async createGlobalAdministration(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createGlobalAdministration(schoolId, data);
  }
  async updateGlobalAdministration(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findGlobalAdministrationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateGlobalAdministration(schoolId, id, data);
  }
  async deleteGlobalAdministration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGlobalAdministrationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteGlobalAdministration(schoolId, id);
  }
  async countGlobalAdministrations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGlobalAdministrations(schoolId, filters);
  }
}
