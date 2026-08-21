import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadBalancerPolicy } from '@educi/types';
import { EduCloudLoadBalancerPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudLoadBalancerPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getLoadBalancerPolicy(schoolId: string, id: string): Promise<LoadBalancerPolicy> {
    const item = await this.repo.getLoadBalancerPolicy(schoolId, id);
    if (!item) throw new EduCloudLoadBalancerPolicyError(id);
    return item;
  }
  async listLoadBalancerPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<LoadBalancerPolicy[]> {
    return this.repo.listLoadBalancerPolicy(schoolId, filters);
  }
  async createLoadBalancerPolicy(schoolId: string, data: Partial<LoadBalancerPolicy>): Promise<LoadBalancerPolicy> {
    return this.repo.createLoadBalancerPolicy(schoolId, data as any);
  }
  async updateLoadBalancerPolicy(schoolId: string, id: string, data: Partial<LoadBalancerPolicy>): Promise<LoadBalancerPolicy> {
    const existing = await this.repo.getLoadBalancerPolicy(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerPolicyError(id);
    return this.repo.updateLoadBalancerPolicy(schoolId, id, data as any);
  }
  async deleteLoadBalancerPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLoadBalancerPolicy(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerPolicyError(id);
    return this.repo.deleteLoadBalancerPolicy(schoolId, id);
  }
}
