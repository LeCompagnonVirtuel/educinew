import { SupabaseClient } from '@supabase/supabase-js';
import { ApiGatewayService, ApiGateway } from './gei2p-apihub-api-gateway.service';

export class InteroperabilityApiService {
  private readonly gatewayService: ApiGatewayService;

  constructor(supabase: SupabaseClient) {
    this.gatewayService = new ApiGatewayService(supabase);
  }

  async listApis(schoolId: string, filters?: Record<string, unknown>): Promise<ApiGateway[]> {
    return this.gatewayService.listEntities(schoolId, filters as { status?: string; limit?: number; offset?: number });
  }

  async getApi(schoolId: string, id: string): Promise<ApiGateway | null> {
    const entity = await this.gatewayService.getEntity(id);
    if (entity && entity.school_id === schoolId) return entity;
    return null;
  }

  async createApi(schoolId: string, userId: string, data: Record<string, unknown>): Promise<ApiGateway | null> {
    return this.gatewayService.createEntity({ ...data, school_id: schoolId } as Parameters<ApiGatewayService['createEntity']>[0]);
  }

  async updateApi(schoolId: string, id: string, data: Record<string, unknown>): Promise<ApiGateway | null> {
    const entity = await this.gatewayService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return null;
    return this.gatewayService.updateEntity(id, data as Parameters<ApiGatewayService['updateEntity']>[1]);
  }

  async deleteApi(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.gatewayService.getEntity(id);
    if (!entity || entity.school_id !== schoolId) return false;
    return this.gatewayService.deleteEntity(id);
  }
}
