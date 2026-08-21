// Government & National Governance Service - InspectorPerformance
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectorPerformance, InspectorPerformanceCreate } from '@educi/types';
import { GovInspectorPerformanceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectorPerformanceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectorPerformance(schoolId: string, id: string): Promise<InspectorPerformance> {
    const item = await this.repo.findInspectorPerformanceById(schoolId, id);
    if (!item) throw new GovInspectorPerformanceNotFoundError(id);
    return item;
  }

  async listInspectorPerformances(schoolId: string, filters?: Record<string, unknown>): Promise<InspectorPerformance[]> {
    return this.repo.findAllInspectorPerformances(schoolId, filters);
  }

  async createInspectorPerformance(schoolId: string, data: InspectorPerformanceCreate): Promise<InspectorPerformance> {
    return this.repo.createInspectorPerformance(schoolId, data);
  }

  async updateInspectorPerformance(schoolId: string, id: string, data: Partial<InspectorPerformanceCreate>): Promise<InspectorPerformance> {
    const existing = await this.repo.findInspectorPerformanceById(schoolId, id);
    if (!existing) throw new GovInspectorPerformanceNotFoundError(id);
    return this.repo.updateInspectorPerformance(schoolId, id, data);
  }

  async deleteInspectorPerformance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectorPerformanceById(schoolId, id);
    if (!existing) throw new GovInspectorPerformanceNotFoundError(id);
    return this.repo.deleteInspectorPerformance(schoolId, id);
  }

  async countInspectorPerformances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectorPerformances(schoolId, filters);
  }
}
