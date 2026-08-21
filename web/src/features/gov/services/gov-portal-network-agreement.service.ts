import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkAgreement, NetworkAgreementCreate } from '@educi/types';
import { GovNetworkAgreementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalNetworkAgreementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NetworkAgreement> {
    const item = await this.repo.findNetworkAgreementById(schoolId, id);
    if (!item) throw new GovNetworkAgreementNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkAgreement[]> {
    return this.repo.findAllNetworkAgreements(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement> {
    return this.repo.createNetworkAgreement(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement> {
    const existing = await this.repo.findNetworkAgreementById(schoolId, id);
    if (!existing) throw new GovNetworkAgreementNotFoundError(id);
    return this.repo.updateNetworkAgreement(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkAgreementById(schoolId, id);
    if (!existing) throw new GovNetworkAgreementNotFoundError(id);
    return this.repo.deleteNetworkAgreement(schoolId, id);
  }
}
