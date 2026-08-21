import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadBalancer } from '@educi/types';
import { EduCloudLoadBalancerError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudLoadBalancer {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getLoadBalancer(schoolId: string, id: string): Promise<LoadBalancer> {
    const item = await this.repo.getLoadBalancer(schoolId, id);
    if (!item) throw new EduCloudLoadBalancerError(id);
    return item;
  }
  async listLoadBalancers(schoolId: string, filters?: Record<string, unknown>): Promise<LoadBalancer[]> {
    return this.repo.listLoadBalancer(schoolId, filters);
  }
  async createLoadBalancer(schoolId: string, data: Partial<LoadBalancer>): Promise<LoadBalancer> {
    return this.repo.createLoadBalancer(schoolId, data as any);
  }
  async updateLoadBalancer(schoolId: string, id: string, data: Partial<LoadBalancer>): Promise<LoadBalancer> {
    const existing = await this.repo.getLoadBalancer(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerError(id);
    return this.repo.updateLoadBalancer(schoolId, id, data as any);
  }
  async deleteLoadBalancer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLoadBalancer(schoolId, id);
    if (!existing) throw new EduCloudLoadBalancerError(id);
    return this.repo.deleteLoadBalancer(schoolId, id);
  }
}
