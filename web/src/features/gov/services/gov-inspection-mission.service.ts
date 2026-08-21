// Government & National Governance Service - InspectionMission
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionMission, InspectionMissionCreate } from '@educi/types';
import { GovInspectionMissionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionMissionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionMission(schoolId: string, id: string): Promise<InspectionMission> {
    const item = await this.repo.findInspectionMissionById(schoolId, id);
    if (!item) throw new GovInspectionMissionNotFoundError(id);
    return item;
  }

  async listInspectionMissions(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionMission[]> {
    return this.repo.findAllInspectionMissions(schoolId, filters);
  }

  async createInspectionMission(schoolId: string, data: InspectionMissionCreate): Promise<InspectionMission> {
    return this.repo.createInspectionMission(schoolId, data);
  }

  async updateInspectionMission(schoolId: string, id: string, data: Partial<InspectionMissionCreate>): Promise<InspectionMission> {
    const existing = await this.repo.findInspectionMissionById(schoolId, id);
    if (!existing) throw new GovInspectionMissionNotFoundError(id);
    return this.repo.updateInspectionMission(schoolId, id, data);
  }

  async deleteInspectionMission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionMissionById(schoolId, id);
    if (!existing) throw new GovInspectionMissionNotFoundError(id);
    return this.repo.deleteInspectionMission(schoolId, id);
  }

  async countInspectionMissions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionMissions(schoolId, filters);
  }
}
