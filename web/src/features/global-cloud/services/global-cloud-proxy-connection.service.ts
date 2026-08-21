import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProxyConnection } from '@educi/types';
import { EduCloudProxyConnectionError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudProxyConnection {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getProxyConnection(schoolId: string, id: string): Promise<ProxyConnection> {
    const item = await this.repo.getProxyConnection(schoolId, id);
    if (!item) throw new EduCloudProxyConnectionError(id);
    return item;
  }
  async listProxyConnections(schoolId: string, filters?: Record<string, unknown>): Promise<ProxyConnection[]> {
    return this.repo.listProxyConnection(schoolId, filters);
  }
  async createProxyConnection(schoolId: string, data: Partial<ProxyConnection>): Promise<ProxyConnection> {
    return this.repo.createProxyConnection(schoolId, data as any);
  }
  async updateProxyConnection(schoolId: string, id: string, data: Partial<ProxyConnection>): Promise<ProxyConnection> {
    const existing = await this.repo.getProxyConnection(schoolId, id);
    if (!existing) throw new EduCloudProxyConnectionError(id);
    return this.repo.updateProxyConnection(schoolId, id, data as any);
  }
  async deleteProxyConnection(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProxyConnection(schoolId, id);
    if (!existing) throw new EduCloudProxyConnectionError(id);
    return this.repo.deleteProxyConnection(schoolId, id);
  }
}
