// Government & National Governance Service - TokenService
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TokenService, TokenServiceCreate } from '@educi/types';
import { GovTokenServiceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovTokenServiceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getTokenService(schoolId: string, id: string): Promise<TokenService> {
    const item = await this.repo.findTokenServiceById(schoolId, id);
    if (!item) throw new GovTokenServiceNotFoundError(id);
    return item;
  }

  async listTokenServices(schoolId: string, filters?: Record<string, unknown>): Promise<TokenService[]> {
    return this.repo.findAllTokenServices(schoolId, filters);
  }

  async createTokenService(schoolId: string, data: TokenServiceCreate): Promise<TokenService> {
    return this.repo.createTokenService(schoolId, data);
  }

  async updateTokenService(schoolId: string, id: string, data: Partial<TokenServiceCreate>): Promise<TokenService> {
    const existing = await this.repo.findTokenServiceById(schoolId, id);
    if (!existing) throw new GovTokenServiceNotFoundError(id);
    return this.repo.updateTokenService(schoolId, id, data);
  }

  async deleteTokenService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTokenServiceById(schoolId, id);
    if (!existing) throw new GovTokenServiceNotFoundError(id);
    return this.repo.deleteTokenService(schoolId, id);
  }

  async countTokenServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTokenServices(schoolId, filters);
  }
}
