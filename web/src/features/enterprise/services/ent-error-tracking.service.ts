// Enterprise Platform Service - ErrorTracking
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntErrorTrackingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getErrorTracking(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findErrorTrackingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listErrorTracking(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllErrorTracking(schoolId, filters);
  }
  async createErrorTracking(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createErrorTracking(schoolId, data);
  }
  async updateErrorTracking(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findErrorTrackingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateErrorTracking(schoolId, id, data);
  }
  async deleteErrorTracking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findErrorTrackingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteErrorTracking(schoolId, id);
  }
  async countErrorTracking(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countErrorTracking(schoolId, filters);
  }
}
