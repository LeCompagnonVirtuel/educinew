// Government & National Governance Service - InspectionChecklist
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionChecklist, InspectionChecklistCreate } from '@educi/types';
import { GovInspectionChecklistNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionChecklistService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionChecklist(schoolId: string, id: string): Promise<InspectionChecklist> {
    const item = await this.repo.findInspectionChecklistById(schoolId, id);
    if (!item) throw new GovInspectionChecklistNotFoundError(id);
    return item;
  }

  async listInspectionChecklists(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionChecklist[]> {
    return this.repo.findAllInspectionChecklists(schoolId, filters);
  }

  async createInspectionChecklist(schoolId: string, data: InspectionChecklistCreate): Promise<InspectionChecklist> {
    return this.repo.createInspectionChecklist(schoolId, data);
  }

  async updateInspectionChecklist(schoolId: string, id: string, data: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist> {
    const existing = await this.repo.findInspectionChecklistById(schoolId, id);
    if (!existing) throw new GovInspectionChecklistNotFoundError(id);
    return this.repo.updateInspectionChecklist(schoolId, id, data);
  }

  async deleteInspectionChecklist(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionChecklistById(schoolId, id);
    if (!existing) throw new GovInspectionChecklistNotFoundError(id);
    return this.repo.deleteInspectionChecklist(schoolId, id);
  }

  async countInspectionChecklists(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionChecklists(schoolId, filters);
  }
}
