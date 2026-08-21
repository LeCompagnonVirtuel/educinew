// Enterprise Platform Service - TenantIsolation
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantIsolation, TenantIsolationCreate } from '@educi/types';
import { EntTenantIsolationNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantIsolationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantIsolation(schoolId: string, id: string): Promise<TenantIsolation> {
    const item = await this.repo.findTenantIsolationById(schoolId, id);
    if (!item) throw new EntTenantIsolationNotFoundError(id);
    return item;
  }
  async listTenantIsolations(schoolId: string, filters?: Record<string, unknown>): Promise<TenantIsolation[]> {
    return this.repo.findAllTenantIsolations(schoolId, filters);
  }
  async createTenantIsolation(schoolId: string, data: TenantIsolationCreate): Promise<TenantIsolation> {
    return this.repo.createTenantIsolation(schoolId, data);
  }
  async updateTenantIsolation(schoolId: string, id: string, data: Partial<TenantIsolationCreate>): Promise<TenantIsolation> {
    const existing = await this.repo.findTenantIsolationById(schoolId, id);
    if (!existing) throw new EntTenantIsolationNotFoundError(id);
    return this.repo.updateTenantIsolation(schoolId, id, data);
  }
  async deleteTenantIsolation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantIsolationById(schoolId, id);
    if (!existing) throw new EntTenantIsolationNotFoundError(id);
    return this.repo.deleteTenantIsolation(schoolId, id);
  }
  async countTenantIsolations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantIsolations(schoolId, filters);
  }
}
