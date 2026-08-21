// Enterprise Platform Service - AutoScalingTriggers
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAutoScalingTriggerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAutoScalingTrigger(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAutoScalingTriggerById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAutoScalingTriggers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAutoScalingTriggers(schoolId, filters);
  }
  async createAutoScalingTrigger(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAutoScalingTrigger(schoolId, data);
  }
  async updateAutoScalingTrigger(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAutoScalingTriggerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAutoScalingTrigger(schoolId, id, data);
  }
  async deleteAutoScalingTrigger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAutoScalingTriggerById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAutoScalingTrigger(schoolId, id);
  }
  async countAutoScalingTriggers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAutoScalingTriggers(schoolId, filters);
  }
}
