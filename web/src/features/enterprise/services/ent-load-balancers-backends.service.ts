// Enterprise Platform Service - LoadBalancersBackends
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoadBalancerBackendService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoadBalancersBackend(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLoadBalancersBackendById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLoadBalancersBackends(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLoadBalancersBackends(schoolId, filters);
  }
  async createLoadBalancersBackend(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLoadBalancersBackend(schoolId, data);
  }
  async updateLoadBalancersBackend(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLoadBalancersBackendById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLoadBalancersBackend(schoolId, id, data);
  }
  async deleteLoadBalancersBackend(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoadBalancersBackendById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLoadBalancersBackend(schoolId, id);
  }
  async countLoadBalancersBackends(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoadBalancersBackends(schoolId, filters);
  }
}
