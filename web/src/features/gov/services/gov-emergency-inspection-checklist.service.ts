import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionChecklist, InspectionChecklistCreate } from '@educi/types';
import { GovInspectionChecklistNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyInspectionChecklistService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InspectionChecklist> {
    const item = await this.repo.findInspectionChecklistById(schoolId, id);
    if (!item) throw new GovInspectionChecklistNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionChecklist[]> {
    return this.repo.findAllInspectionChecklists(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist> {
    return this.repo.createInspectionChecklist(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectionChecklistCreate>): Promise<InspectionChecklist> {
    const existing = await this.repo.findInspectionChecklistById(schoolId, id);
    if (!existing) throw new GovInspectionChecklistNotFoundError(id);
    return this.repo.updateInspectionChecklist(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionChecklistById(schoolId, id);
    if (!existing) throw new GovInspectionChecklistNotFoundError(id);
    return this.repo.deleteInspectionChecklist(schoolId, id);
  }
}
