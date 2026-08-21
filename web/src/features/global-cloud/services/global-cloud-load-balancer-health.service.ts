import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadBalancerHealth } from '@educi/types';
import { EduCloudLoadBalancerHealthError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudLoadBalancerHealth {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getLoadBalancerHealth(schoolId: string, id: string): Promise<LoadBalancerHealth> {
    const item = await this.repo.getLoadBalancerHealth(schoolId, id);
    if (!item) throw new EduCloudLoadBalancerHealthError(id);
    return item;
  }
  async listLoadBalancerHealths(schoolId: string, filters?: Record<string, unknown>): Promise<LoadBalancerHealth[]> {
    return this.repo.listLoadBalancerHealth(schoolId, filters);
  }
  async createLoadBalancerHealth(schoolId: string, data: Partial<LoadBalancerHealth>): Promise<LoadBalancerHealth> {
    return this.repo.createLoadBalancerHealth(schoolId, data as any);
  }
  async updateLoadBalancerHealth(schoolId: string, id: string, data: Partial<LoadBalancerHealth>): Promise<LoadBalancerHealth> {
    const existing = await this.repo.getLoadBalancerHealth(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerHealthError(id);
    return this.repo.updateLoadBalancerHealth(schoolId, id, data as any);
  }
  async deleteLoadBalancerHealth(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLoadBalancerHealth(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerHealthError(id);
    return this.repo.deleteLoadBalancerHealth(schoolId, id);
  }
}
