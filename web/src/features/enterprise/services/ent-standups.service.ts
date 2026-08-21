// Enterprise Platform Service - Standups
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStandupService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStandup(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStandupById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStandups(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStandups(schoolId, filters);
  }
  async createStandup(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStandup(schoolId, data);
  }
  async updateStandup(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStandupById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStandup(schoolId, id, data);
  }
  async deleteStandup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStandupById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStandup(schoolId, id);
  }
  async countStandups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStandups(schoolId, filters);
  }
}
