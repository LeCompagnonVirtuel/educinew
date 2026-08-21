import type { SupabaseClient } from '@supabase/supabase-js';
import type { Accreditation, AccreditationCreate } from '@educi/types';
import { GovAccreditationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationAccreditationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<Accreditation> {
    const item = await this.repo.findAccreditationById(schoolId, id);
    if (!item) throw new GovAccreditationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<Accreditation[]> {
    return this.repo.findAllAccreditations(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<AccreditationCreate>): Promise<Accreditation> {
    return this.repo.createAccreditation(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<AccreditationCreate>): Promise<Accreditation> {
    const existing = await this.repo.findAccreditationById(schoolId, id);
    if (!existing) throw new GovAccreditationNotFoundError(id);
    return this.repo.updateAccreditation(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationById(schoolId, id);
    if (!existing) throw new GovAccreditationNotFoundError(id);
    return this.repo.deleteAccreditation(schoolId, id);
  }
}
