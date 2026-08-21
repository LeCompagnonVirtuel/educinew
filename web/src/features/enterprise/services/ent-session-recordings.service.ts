// Enterprise Platform Service - SessionRecordings
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSessionRecordingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSessionRecording(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSessionRecordingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSessionRecordings(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSessionRecordings(schoolId, filters);
  }
  async createSessionRecording(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSessionRecording(schoolId, data);
  }
  async updateSessionRecording(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSessionRecordingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSessionRecording(schoolId, id, data);
  }
  async deleteSessionRecording(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSessionRecordingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSessionRecording(schoolId, id);
  }
  async countSessionRecordings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSessionRecordings(schoolId, filters);
  }
}
