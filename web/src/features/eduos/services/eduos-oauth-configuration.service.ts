import type { SupabaseClient } from '@supabase/supabase-js';
import type { OAuthConfiguration } from '@educi/types';
import { EduOSOAuthConfigurationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSOAuthConfigurationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getOAuthConfiguration(schoolId: string, id: string): Promise<OAuthConfiguration> {
    const item = await this.repo.getOAuthConfiguration(schoolId, id);
    if (!item) throw new EduOSOAuthConfigurationError(id);
    return item;
  }
  async listOAuthConfigurations(schoolId: string, filters?: Record<string, unknown>): Promise<OAuthConfiguration[]> {
    return this.repo.listOauthConfigurations(schoolId, filters);
  }
  async createOAuthConfiguration(schoolId: string, data: Partial<OAuthConfiguration>): Promise<OAuthConfiguration> {
    return this.repo.createOAuthConfiguration(schoolId, data as any);
  }
  async updateOAuthConfiguration(schoolId: string, id: string, data: Partial<OAuthConfiguration>): Promise<OAuthConfiguration> {
    const existing = await this.repo.getOAuthConfiguration(schoolId, id);
    if (!existing) throw new EduOSOAuthConfigurationError(id);
    return this.repo.updateOAuthConfiguration(schoolId, id, data as any);
  }
  async deleteOAuthConfiguration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getOAuthConfiguration(schoolId, id);
    if (!existing) throw new EduOSOAuthConfigurationError(id);
    return this.repo.deleteOAuthConfiguration(schoolId, id);
  }
}

