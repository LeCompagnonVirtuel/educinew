// Government & National Governance Service - CentralizedAdministration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CentralizedAdministration, CentralizedAdministrationCreate } from '@educi/types';
import { GovCentralizedAdministrationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCentralizedAdministrationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCentralizedAdministration(schoolId: string, id: string): Promise<CentralizedAdministration> {
    const item = await this.repo.findCentralizedAdministrationById(schoolId, id);
    if (!item) throw new GovCentralizedAdministrationNotFoundError(id);
    return item;
  }

  async listCentralizedAdministrations(schoolId: string, filters?: Record<string, unknown>): Promise<CentralizedAdministration[]> {
    return this.repo.findAllCentralizedAdministrations(schoolId, filters);
  }

  async createCentralizedAdministration(schoolId: string, data: CentralizedAdministrationCreate): Promise<CentralizedAdministration> {
    return this.repo.createCentralizedAdministration(schoolId, data);
  }

  async updateCentralizedAdministration(schoolId: string, id: string, data: Partial<CentralizedAdministrationCreate>): Promise<CentralizedAdministration> {
    const existing = await this.repo.findCentralizedAdministrationById(schoolId, id);
    if (!existing) throw new GovCentralizedAdministrationNotFoundError(id);
    return this.repo.updateCentralizedAdministration(schoolId, id, data);
  }

  async deleteCentralizedAdministration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCentralizedAdministrationById(schoolId, id);
    if (!existing) throw new GovCentralizedAdministrationNotFoundError(id);
    return this.repo.deleteCentralizedAdministration(schoolId, id);
  }

  async countCentralizedAdministrations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCentralizedAdministrations(schoolId, filters);
  }
}
