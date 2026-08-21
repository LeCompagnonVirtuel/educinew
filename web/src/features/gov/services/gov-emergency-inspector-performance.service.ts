import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectorPerformance, InspectorPerformanceCreate } from '@educi/types';
import { GovInspectorPerformanceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyInspectorPerformanceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InspectorPerformance> {
    const item = await this.repo.findInspectorPerformanceById(schoolId, id);
    if (!item) throw new GovInspectorPerformanceNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InspectorPerformance[]> {
    return this.repo.findAllInspectorPerformances(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance> {
    return this.repo.createInspectorPerformance(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance> {
    const existing = await this.repo.findInspectorPerformanceById(schoolId, id);
    if (!existing) throw new GovInspectorPerformanceNotFoundError(id);
    return this.repo.updateInspectorPerformance(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectorPerformanceById(schoolId, id);
    if (!existing) throw new GovInspectorPerformanceNotFoundError(id);
    return this.repo.deleteInspectorPerformance(schoolId, id);
  }
}
