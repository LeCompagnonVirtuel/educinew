// Government & National Governance Service - CorrectiveAction
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CorrectiveAction, CorrectiveActionCreate } from '@educi/types';
import { GovCorrectiveActionNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCorrectiveActionService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCorrectiveAction(schoolId: string, id: string): Promise<CorrectiveAction> {
    const item = await this.repo.findCorrectiveActionById(schoolId, id);
    if (!item) throw new GovCorrectiveActionNotFoundError(id);
    return item;
  }

  async listCorrectiveActions(schoolId: string, filters?: Record<string, unknown>): Promise<CorrectiveAction[]> {
    return this.repo.findAllCorrectiveActions(schoolId, filters);
  }

  async createCorrectiveAction(schoolId: string, data: CorrectiveActionCreate): Promise<CorrectiveAction> {
    return this.repo.createCorrectiveAction(schoolId, data);
  }

  async updateCorrectiveAction(schoolId: string, id: string, data: Partial<CorrectiveActionCreate>): Promise<CorrectiveAction> {
    const existing = await this.repo.findCorrectiveActionById(schoolId, id);
    if (!existing) throw new GovCorrectiveActionNotFoundError(id);
    return this.repo.updateCorrectiveAction(schoolId, id, data);
  }

  async deleteCorrectiveAction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCorrectiveActionById(schoolId, id);
    if (!existing) throw new GovCorrectiveActionNotFoundError(id);
    return this.repo.deleteCorrectiveAction(schoolId, id);
  }

  async countCorrectiveActions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCorrectiveActions(schoolId, filters);
  }
}
