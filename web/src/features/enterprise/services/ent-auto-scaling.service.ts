// Enterprise Platform Service - AutoScaling
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAutoScalingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAutoScaling(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAutoScalingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAutoScaling(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAutoScaling(schoolId, filters);
  }
  async createAutoScaling(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAutoScaling(schoolId, data);
  }
  async updateAutoScaling(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAutoScalingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAutoScaling(schoolId, id, data);
  }
  async deleteAutoScaling(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAutoScalingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAutoScaling(schoolId, id);
  }
  async countAutoScaling(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAutoScaling(schoolId, filters);
  }
}
