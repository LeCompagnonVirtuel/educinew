// Enterprise Platform Service - SystemHealth
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSystemHealthService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSystemHealth(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSystemHealthById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSystemHealth(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSystemHealth(schoolId, filters);
  }
  async createSystemHealth(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSystemHealth(schoolId, data);
  }
  async updateSystemHealth(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSystemHealthById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSystemHealth(schoolId, id, data);
  }
  async deleteSystemHealth(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSystemHealthById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSystemHealth(schoolId, id);
  }
  async countSystemHealth(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSystemHealth(schoolId, filters);
  }
}
