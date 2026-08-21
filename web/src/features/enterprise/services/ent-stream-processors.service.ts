// Enterprise Platform Service - StreamProcessors
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStreamProcessorService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStreamProcessor(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStreamProcessorById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStreamProcessors(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStreamProcessors(schoolId, filters);
  }
  async createStreamProcessor(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStreamProcessor(schoolId, data);
  }
  async updateStreamProcessor(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStreamProcessorById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStreamProcessor(schoolId, id, data);
  }
  async deleteStreamProcessor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStreamProcessorById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStreamProcessor(schoolId, id);
  }
  async countStreamProcessors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStreamProcessors(schoolId, filters);
  }
}
