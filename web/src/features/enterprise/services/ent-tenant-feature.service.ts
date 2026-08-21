// Enterprise Platform Service - TenantFeature
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantFeature, TenantFeatureCreate } from '@educi/types';
import { EntTenantFeatureNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantFeatureService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantFeature(schoolId: string, id: string): Promise<TenantFeature> {
    const item = await this.repo.findTenantFeatureById(schoolId, id);
    if (!item) throw new EntTenantFeatureNotFoundError(id);
    return item;
  }
  async listTenantFeatures(schoolId: string, filters?: Record<string, unknown>): Promise<TenantFeature[]> {
    return this.repo.findAllTenantFeatures(schoolId, filters);
  }
  async createTenantFeature(schoolId: string, data: TenantFeatureCreate): Promise<TenantFeature> {
    return this.repo.createTenantFeature(schoolId, data);
  }
  async updateTenantFeature(schoolId: string, id: string, data: Partial<TenantFeatureCreate>): Promise<TenantFeature> {
    const existing = await this.repo.findTenantFeatureById(schoolId, id);
    if (!existing) throw new EntTenantFeatureNotFoundError(id);
    return this.repo.updateTenantFeature(schoolId, id, data);
  }
  async deleteTenantFeature(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantFeatureById(schoolId, id);
    if (!existing) throw new EntTenantFeatureNotFoundError(id);
    return this.repo.deleteTenantFeature(schoolId, id);
  }
  async countTenantFeatures(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantFeatures(schoolId, filters);
  }
}
