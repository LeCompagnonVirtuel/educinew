// Enterprise Platform Service - ErrorTrackingOccurrences
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntErrorOccurrenceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getErrorTrackingOccurrence(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findErrorTrackingOccurrenceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listErrorTrackingOccurrences(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllErrorTrackingOccurrences(schoolId, filters);
  }
  async createErrorTrackingOccurrence(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createErrorTrackingOccurrence(schoolId, data);
  }
  async updateErrorTrackingOccurrence(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findErrorTrackingOccurrenceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateErrorTrackingOccurrence(schoolId, id, data);
  }
  async deleteErrorTrackingOccurrence(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findErrorTrackingOccurrenceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteErrorTrackingOccurrence(schoolId, id);
  }
  async countErrorTrackingOccurrences(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countErrorTrackingOccurrences(schoolId, filters);
  }
}
