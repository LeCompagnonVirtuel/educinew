import type { SupabaseClient } from '@supabase/supabase-js';
import type { ApiGateway } from '@educi/types';
import { EduCloudApiGatewayError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudApiGateway {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getApiGateway(schoolId: string, id: string): Promise<ApiGateway> {
    const item = await this.repo.getApiGateway(schoolId, id);
    if (!item) throw new EduCloudApiGatewayError(id);
    return item;
  }
  async listApiGateways(schoolId: string, filters?: Record<string, unknown>): Promise<ApiGateway[]> {
    return this.repo.listApiGateway(schoolId, filters);
  }
  async createApiGateway(schoolId: string, data: Partial<ApiGateway>): Promise<ApiGateway> {
    return this.repo.createApiGateway(schoolId, data as any);
  }
  async updateApiGateway(schoolId: string, id: string, data: Partial<ApiGateway>): Promise<ApiGateway> {
    const existing = await this.repo.getApiGateway(schoolId, id);
    if (!existing) throw new EduCloudApiGatewayError(id);
    return this.repo.updateApiGateway(schoolId, id, data as any);
  }
  async deleteApiGateway(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getApiGateway(schoolId, id);
    if (!existing) throw new EduCloudApiGatewayError(id);
    return this.repo.deleteApiGateway(schoolId, id);
  }
}
