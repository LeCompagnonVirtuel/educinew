// Enterprise Platform Service - IntrusionDetections
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIntrusionDetectionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIntrusionDetection(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findIntrusionDetectionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listIntrusionDetections(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllIntrusionDetections(schoolId, filters);
  }
  async createIntrusionDetection(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createIntrusionDetection(schoolId, data);
  }
  async updateIntrusionDetection(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findIntrusionDetectionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateIntrusionDetection(schoolId, id, data);
  }
  async deleteIntrusionDetection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIntrusionDetectionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteIntrusionDetection(schoolId, id);
  }
  async countIntrusionDetections(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIntrusionDetections(schoolId, filters);
  }
}
