// Enterprise Platform Service - ServiceHealth
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceHealth, ServiceHealthCreate } from '@educi/types';
import { EntServiceHealthNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntServiceHealthService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getServiceHealth(schoolId: string, id: string): Promise<ServiceHealth> {
    const item = await this.repo.findServiceHealthById(schoolId, id);
    if (!item) throw new EntServiceHealthNotFoundError(id);
    return item;
  }
  async listServiceHealths(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceHealth[]> {
    return this.repo.findAllServiceHealths(schoolId, filters);
  }
  async createServiceHealth(schoolId: string, data: ServiceHealthCreate): Promise<ServiceHealth> {
    return this.repo.createServiceHealth(schoolId, data);
  }
  async updateServiceHealth(schoolId: string, id: string, data: Partial<ServiceHealthCreate>): Promise<ServiceHealth> {
    const existing = await this.repo.findServiceHealthById(schoolId, id);
    if (!existing) throw new EntServiceHealthNotFoundError(id);
    return this.repo.updateServiceHealth(schoolId, id, data);
  }
  async deleteServiceHealth(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findServiceHealthById(schoolId, id);
    if (!existing) throw new EntServiceHealthNotFoundError(id);
    return this.repo.deleteServiceHealth(schoolId, id);
  }
  async countServiceHealths(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countServiceHealths(schoolId, filters);
  }
}
