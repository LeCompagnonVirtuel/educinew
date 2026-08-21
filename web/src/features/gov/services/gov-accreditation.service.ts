// Government & National Governance Service - Accreditation
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Accreditation, AccreditationCreate } from '@educi/types';
import { GovAccreditationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditation(schoolId: string, id: string): Promise<Accreditation> {
    const item = await this.repo.findAccreditationById(schoolId, id);
    if (!item) throw new GovAccreditationNotFoundError(id);
    return item;
  }

  async listAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<Accreditation[]> {
    return this.repo.findAllAccreditations(schoolId, filters);
  }

  async createAccreditation(schoolId: string, data: AccreditationCreate): Promise<Accreditation> {
    return this.repo.createAccreditation(schoolId, data);
  }

  async updateAccreditation(schoolId: string, id: string, data: Partial<AccreditationCreate>): Promise<Accreditation> {
    const existing = await this.repo.findAccreditationById(schoolId, id);
    if (!existing) throw new GovAccreditationNotFoundError(id);
    return this.repo.updateAccreditation(schoolId, id, data);
  }

  async deleteAccreditation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationById(schoolId, id);
    if (!existing) throw new GovAccreditationNotFoundError(id);
    return this.repo.deleteAccreditation(schoolId, id);
  }

  async countAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditations(schoolId, filters);
  }
}
