// Government & National Governance Service - NetworkAgreement
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkAgreement, NetworkAgreementCreate } from '@educi/types';
import { GovNetworkAgreementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNetworkAgreementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNetworkAgreement(schoolId: string, id: string): Promise<NetworkAgreement> {
    const item = await this.repo.findNetworkAgreementById(schoolId, id);
    if (!item) throw new GovNetworkAgreementNotFoundError(id);
    return item;
  }

  async listNetworkAgreements(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkAgreement[]> {
    return this.repo.findAllNetworkAgreements(schoolId, filters);
  }

  async createNetworkAgreement(schoolId: string, data: NetworkAgreementCreate): Promise<NetworkAgreement> {
    return this.repo.createNetworkAgreement(schoolId, data);
  }

  async updateNetworkAgreement(schoolId: string, id: string, data: Partial<NetworkAgreementCreate>): Promise<NetworkAgreement> {
    const existing = await this.repo.findNetworkAgreementById(schoolId, id);
    if (!existing) throw new GovNetworkAgreementNotFoundError(id);
    return this.repo.updateNetworkAgreement(schoolId, id, data);
  }

  async deleteNetworkAgreement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkAgreementById(schoolId, id);
    if (!existing) throw new GovNetworkAgreementNotFoundError(id);
    return this.repo.deleteNetworkAgreement(schoolId, id);
  }

  async countNetworkAgreements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworkAgreements(schoolId, filters);
  }
}
