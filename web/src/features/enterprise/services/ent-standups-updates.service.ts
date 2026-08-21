// Enterprise Platform Service - StandupsUpdates
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStandupUpdateService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStandupsUpdate(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStandupsUpdateById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStandupsUpdates(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStandupsUpdates(schoolId, filters);
  }
  async createStandupsUpdate(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStandupsUpdate(schoolId, data);
  }
  async updateStandupsUpdate(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStandupsUpdateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStandupsUpdate(schoolId, id, data);
  }
  async deleteStandupsUpdate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStandupsUpdateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStandupsUpdate(schoolId, id);
  }
  async countStandupsUpdates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStandupsUpdates(schoolId, filters);
  }
}
