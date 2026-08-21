// Government & National Governance Service - ReferenceNumber
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReferenceNumber, ReferenceNumberCreate } from '@educi/types';
import { GovReferenceNumberNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovReferenceNumberService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getReferenceNumber(schoolId: string, id: string): Promise<ReferenceNumber> {
    const item = await this.repo.findReferenceNumberById(schoolId, id);
    if (!item) throw new GovReferenceNumberNotFoundError(id);
    return item;
  }

  async listReferenceNumbers(schoolId: string, filters?: Record<string, unknown>): Promise<ReferenceNumber[]> {
    return this.repo.findAllReferenceNumbers(schoolId, filters);
  }

  async createReferenceNumber(schoolId: string, data: ReferenceNumberCreate): Promise<ReferenceNumber> {
    return this.repo.createReferenceNumber(schoolId, data);
  }

  async updateReferenceNumber(schoolId: string, id: string, data: Partial<ReferenceNumberCreate>): Promise<ReferenceNumber> {
    const existing = await this.repo.findReferenceNumberById(schoolId, id);
    if (!existing) throw new GovReferenceNumberNotFoundError(id);
    return this.repo.updateReferenceNumber(schoolId, id, data);
  }

  async deleteReferenceNumber(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReferenceNumberById(schoolId, id);
    if (!existing) throw new GovReferenceNumberNotFoundError(id);
    return this.repo.deleteReferenceNumber(schoolId, id);
  }

  async countReferenceNumbers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReferenceNumbers(schoolId, filters);
  }
}
