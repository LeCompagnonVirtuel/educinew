// Enterprise Platform Service - LoadBalancer
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadBalancer, LoadBalancerCreate } from '@educi/types';
import { EntLoadBalancerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoadBalancerServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoadBalancerService(schoolId: string, id: string): Promise<LoadBalancer> {
    const item = await this.repo.findLoadBalancerServiceById(schoolId, id);
    if (!item) throw new EntLoadBalancerNotFoundError(id);
    return item;
  }
  async listLoadBalancerServices(schoolId: string, filters?: Record<string, unknown>): Promise<LoadBalancer[]> {
    return this.repo.findAllLoadBalancerServices(schoolId, filters);
  }
  async createLoadBalancerService(schoolId: string, data: LoadBalancerCreate): Promise<LoadBalancer> {
    return this.repo.createLoadBalancerService(schoolId, data);
  }
  async updateLoadBalancerService(schoolId: string, id: string, data: Partial<LoadBalancerCreate>): Promise<LoadBalancer> {
    const existing = await this.repo.findLoadBalancerServiceById(schoolId, id);
    if (!existing) throw new EntLoadBalancerNotFoundError(id);
    return this.repo.updateLoadBalancerService(schoolId, id, data);
  }
  async deleteLoadBalancerService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoadBalancerServiceById(schoolId, id);
    if (!existing) throw new EntLoadBalancerNotFoundError(id);
    return this.repo.deleteLoadBalancerService(schoolId, id);
  }
  async countLoadBalancerServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoadBalancerServices(schoolId, filters);
  }
}
