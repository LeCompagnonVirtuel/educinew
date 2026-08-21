// Enterprise Platform Service - LoadBalancersHealthChecks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoadBalancerHealthCheckService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoadBalancersHealthCheck(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLoadBalancersHealthCheckById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLoadBalancersHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLoadBalancersHealthChecks(schoolId, filters);
  }
  async createLoadBalancersHealthCheck(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLoadBalancersHealthCheck(schoolId, data);
  }
  async updateLoadBalancersHealthCheck(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLoadBalancersHealthCheckById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLoadBalancersHealthCheck(schoolId, id, data);
  }
  async deleteLoadBalancersHealthCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoadBalancersHealthCheckById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLoadBalancersHealthCheck(schoolId, id);
  }
  async countLoadBalancersHealthChecks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoadBalancersHealthChecks(schoolId, filters);
  }
}
