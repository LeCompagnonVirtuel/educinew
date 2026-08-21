import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProxyRoute } from '@educi/types';
import { EduCloudProxyRouteError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudProxyRoute {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getProxyRoute(schoolId: string, id: string): Promise<ProxyRoute> {
    const item = await this.repo.getProxyRoute(schoolId, id);
    if (!item) throw new EduCloudProxyRouteError(id);
    return item;
  }
  async listProxyRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<ProxyRoute[]> {
    return this.repo.listProxyRoute(schoolId, filters);
  }
  async createProxyRoute(schoolId: string, data: Partial<ProxyRoute>): Promise<ProxyRoute> {
    return this.repo.createProxyRoute(schoolId, data as any);
  }
  async updateProxyRoute(schoolId: string, id: string, data: Partial<ProxyRoute>): Promise<ProxyRoute> {
    const existing = await this.repo.getProxyRoute(schoolId, id);
    if (!existing) throw new EduCloudProxyRouteError(id);
    return this.repo.updateProxyRoute(schoolId, id, data as any);
  }
  async deleteProxyRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProxyRoute(schoolId, id);
    if (!existing) throw new EduCloudProxyRouteError(id);
    return this.repo.deleteProxyRoute(schoolId, id);
  }
}
