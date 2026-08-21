import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadBalancerPool } from '@educi/types';
import { EduCloudLoadBalancerPoolError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudLoadBalancerPool {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getLoadBalancerPool(schoolId: string, id: string): Promise<LoadBalancerPool> {
    const item = await this.repo.getLoadBalancerPool(schoolId, id);
    if (!item) throw new EduCloudLoadBalancerPoolError(id);
    return item;
  }
  async listLoadBalancerPools(schoolId: string, filters?: Record<string, unknown>): Promise<LoadBalancerPool[]> {
    return this.repo.listLoadBalancerPool(schoolId, filters);
  }
  async createLoadBalancerPool(schoolId: string, data: Partial<LoadBalancerPool>): Promise<LoadBalancerPool> {
    return this.repo.createLoadBalancerPool(schoolId, data as any);
  }
  async updateLoadBalancerPool(schoolId: string, id: string, data: Partial<LoadBalancerPool>): Promise<LoadBalancerPool> {
    const existing = await this.repo.getLoadBalancerPool(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerPoolError(id);
    return this.repo.updateLoadBalancerPool(schoolId, id, data as any);
  }
  async deleteLoadBalancerPool(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLoadBalancerPool(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerPoolError(id);
    return this.repo.deleteLoadBalancerPool(schoolId, id);
  }
}
