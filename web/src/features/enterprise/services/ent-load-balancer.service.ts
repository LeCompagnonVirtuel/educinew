// Enterprise Platform Service - LoadBalancer
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadBalancer, LoadBalancerCreate } from '@educi/types';
import { EntLoadBalancerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoadBalancerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoadBalancer(schoolId: string, id: string): Promise<LoadBalancer> {
    const item = await this.repo.findLoadBalancerById(schoolId, id);
    if (!item) throw new EntLoadBalancerNotFoundError(id);
    return item;
  }
  async listLoadBalancers(schoolId: string, filters?: Record<string, unknown>): Promise<LoadBalancer[]> {
    return this.repo.findAllLoadBalancers(schoolId, filters);
  }
  async createLoadBalancer(schoolId: string, data: LoadBalancerCreate): Promise<LoadBalancer> {
    return this.repo.createLoadBalancer(schoolId, data);
  }
  async updateLoadBalancer(schoolId: string, id: string, data: Partial<LoadBalancerCreate>): Promise<LoadBalancer> {
    const existing = await this.repo.findLoadBalancerById(schoolId, id);
    if (!existing) throw new EntLoadBalancerNotFoundError(id);
    return this.repo.updateLoadBalancer(schoolId, id, data);
  }
  async deleteLoadBalancer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoadBalancerById(schoolId, id);
    if (!existing) throw new EntLoadBalancerNotFoundError(id);
    return this.repo.deleteLoadBalancer(schoolId, id);
  }
  async countLoadBalancers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoadBalancers(schoolId, filters);
  }
}
