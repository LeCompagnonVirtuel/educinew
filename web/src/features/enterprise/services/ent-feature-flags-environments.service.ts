// Enterprise Platform Service - FeatureFlagsEnvironments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureFlagEnvironmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureFlagsEnvironment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFeatureFlagsEnvironmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFeatureFlagsEnvironments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFeatureFlagsEnvironments(schoolId, filters);
  }
  async createFeatureFlagsEnvironment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFeatureFlagsEnvironment(schoolId, data);
  }
  async updateFeatureFlagsEnvironment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFeatureFlagsEnvironmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFeatureFlagsEnvironment(schoolId, id, data);
  }
  async deleteFeatureFlagsEnvironment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureFlagsEnvironmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFeatureFlagsEnvironment(schoolId, id);
  }
  async countFeatureFlagsEnvironments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureFlagsEnvironments(schoolId, filters);
  }
}
