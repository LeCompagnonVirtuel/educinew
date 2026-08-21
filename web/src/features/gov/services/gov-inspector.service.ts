// Government & National Governance Service - Inspector
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Inspector, InspectorCreate } from '@educi/types';
import { GovInspectorNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectorService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspector(schoolId: string, id: string): Promise<Inspector> {
    const item = await this.repo.findInspectorById(schoolId, id);
    if (!item) throw new GovInspectorNotFoundError(id);
    return item;
  }

  async listInspectors(schoolId: string, filters?: Record<string, unknown>): Promise<Inspector[]> {
    return this.repo.findAllInspectors(schoolId, filters);
  }

  async createInspector(schoolId: string, data: InspectorCreate): Promise<Inspector> {
    return this.repo.createInspector(schoolId, data);
  }

  async updateInspector(schoolId: string, id: string, data: Partial<InspectorCreate>): Promise<Inspector> {
    const existing = await this.repo.findInspectorById(schoolId, id);
    if (!existing) throw new GovInspectorNotFoundError(id);
    return this.repo.updateInspector(schoolId, id, data);
  }

  async deleteInspector(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectorById(schoolId, id);
    if (!existing) throw new GovInspectorNotFoundError(id);
    return this.repo.deleteInspector(schoolId, id);
  }

  async countInspectors(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectors(schoolId, filters);
  }
}
