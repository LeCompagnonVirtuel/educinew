// Enterprise Platform Service - ConfigMaps
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntConfigMapService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getConfigMap(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findConfigMapById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listConfigMaps(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllConfigMaps(schoolId, filters);
  }
  async createConfigMap(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createConfigMap(schoolId, data);
  }
  async updateConfigMap(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findConfigMapById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateConfigMap(schoolId, id, data);
  }
  async deleteConfigMap(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findConfigMapById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteConfigMap(schoolId, id);
  }
  async countConfigMaps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countConfigMaps(schoolId, filters);
  }
}
