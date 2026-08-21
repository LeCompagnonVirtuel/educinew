import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProxyPolicy } from '@educi/types';
import { EduCloudProxyPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudProxyPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getProxyPolicy(schoolId: string, id: string): Promise<ProxyPolicy> {
    const item = await this.repo.getProxyPolicy(schoolId, id);
    if (!item) throw new EduCloudProxyPolicyError(id);
    return item;
  }
  async listProxyPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<ProxyPolicy[]> {
    return this.repo.listProxyPolicy(schoolId, filters);
  }
  async createProxyPolicy(schoolId: string, data: Partial<ProxyPolicy>): Promise<ProxyPolicy> {
    return this.repo.createProxyPolicy(schoolId, data as any);
  }
  async updateProxyPolicy(schoolId: string, id: string, data: Partial<ProxyPolicy>): Promise<ProxyPolicy> {
    const existing = await this.repo.getProxyPolicy(schoolId, id);
    if (!existing) throw new EduCloudProxyPolicyError(id);
    return this.repo.updateProxyPolicy(schoolId, id, data as any);
  }
  async deleteProxyPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProxyPolicy(schoolId, id);
    if (!existing) throw new EduCloudProxyPolicyError(id);
    return this.repo.deleteProxyPolicy(schoolId, id);
  }
}
