// Enterprise Platform Service - Touchpoints
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTouchpointService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTouchpoint(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTouchpointById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTouchpoints(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTouchpoints(schoolId, filters);
  }
  async createTouchpoint(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTouchpoint(schoolId, data);
  }
  async updateTouchpoint(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTouchpointById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTouchpoint(schoolId, id, data);
  }
  async deleteTouchpoint(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTouchpointById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTouchpoint(schoolId, id);
  }
  async countTouchpoints(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTouchpoints(schoolId, filters);
  }
}
