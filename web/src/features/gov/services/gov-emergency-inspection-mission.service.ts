import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionMission, InspectionMissionCreate } from '@educi/types';
import { GovInspectionMissionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyInspectionMissionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InspectionMission> {
    const item = await this.repo.findInspectionMissionById(schoolId, id);
    if (!item) throw new GovInspectionMissionNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionMission[]> {
    return this.repo.findAllInspectionMissions(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectionMissionCreate>): Promise<InspectionMission> {
    return this.repo.createInspectionMission(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectionMissionCreate>): Promise<InspectionMission> {
    const existing = await this.repo.findInspectionMissionById(schoolId, id);
    if (!existing) throw new GovInspectionMissionNotFoundError(id);
    return this.repo.updateInspectionMission(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionMissionById(schoolId, id);
    if (!existing) throw new GovInspectionMissionNotFoundError(id);
    return this.repo.deleteInspectionMission(schoolId, id);
  }
}
