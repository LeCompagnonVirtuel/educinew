// Enterprise Platform Service - SlaTracking
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSlaTrackingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSlaTracking(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSlaTrackingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSlaTracking(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSlaTracking(schoolId, filters);
  }
  async createSlaTracking(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSlaTracking(schoolId, data);
  }
  async updateSlaTracking(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSlaTrackingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSlaTracking(schoolId, id, data);
  }
  async deleteSlaTracking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSlaTrackingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSlaTracking(schoolId, id);
  }
  async countSlaTracking(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSlaTracking(schoolId, filters);
  }
}
