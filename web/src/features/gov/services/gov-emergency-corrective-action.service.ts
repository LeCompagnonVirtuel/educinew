import type { SupabaseClient } from '@supabase/supabase-js';
import type { CorrectiveAction, CorrectiveActionCreate } from '@educi/types';
import { GovCorrectiveActionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyCorrectiveActionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<CorrectiveAction> {
    const item = await this.repo.findCorrectiveActionById(schoolId, id);
    if (!item) throw new GovCorrectiveActionNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectiveAction[]> {
    return this.repo.findAllCorrectiveActions(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction> {
    return this.repo.createCorrectiveAction(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction> {
    const existing = await this.repo.findCorrectiveActionById(schoolId, id);
    if (!existing) throw new GovCorrectiveActionNotFoundError(id);
    return this.repo.updateCorrectiveAction(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCorrectiveActionById(schoolId, id);
    if (!existing) throw new GovCorrectiveActionNotFoundError(id);
    return this.repo.deleteCorrectiveAction(schoolId, id);
  }
}
