// Enterprise Platform Service - SlaTrackingBreaches
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSlaBreachService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSlaTrackingBreache(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSlaTrackingBreacheById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSlaTrackingBreaches(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSlaTrackingBreaches(schoolId, filters);
  }
  async createSlaTrackingBreache(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSlaTrackingBreache(schoolId, data);
  }
  async updateSlaTrackingBreache(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSlaTrackingBreacheById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSlaTrackingBreache(schoolId, id, data);
  }
  async deleteSlaTrackingBreache(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSlaTrackingBreacheById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSlaTrackingBreache(schoolId, id);
  }
  async countSlaTrackingBreaches(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSlaTrackingBreaches(schoolId, filters);
  }
}
