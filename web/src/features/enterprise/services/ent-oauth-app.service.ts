// Enterprise Platform Service - OAuthApp
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { OAuthApp, OAuthAppCreate } from '@educi/types';
import { EntOAuthAppNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntOAuthAppService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOAuthApp(schoolId: string, id: string): Promise<OAuthApp> {
    const item = await this.repo.findOAuthAppById(schoolId, id);
    if (!item) throw new EntOAuthAppNotFoundError(id);
    return item;
  }
  async listOAuthApps(schoolId: string, filters?: Record<string, unknown>): Promise<OAuthApp[]> {
    return this.repo.findAllOAuthApps(schoolId, filters);
  }
  async createOAuthApp(schoolId: string, data: OAuthAppCreate): Promise<OAuthApp> {
    return this.repo.createOAuthApp(schoolId, data);
  }
  async updateOAuthApp(schoolId: string, id: string, data: Partial<OAuthAppCreate>): Promise<OAuthApp> {
    const existing = await this.repo.findOAuthAppById(schoolId, id);
    if (!existing) throw new EntOAuthAppNotFoundError(id);
    return this.repo.updateOAuthApp(schoolId, id, data);
  }
  async deleteOAuthApp(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOAuthAppById(schoolId, id);
    if (!existing) throw new EntOAuthAppNotFoundError(id);
    return this.repo.deleteOAuthApp(schoolId, id);
  }
  async countOAuthApps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOAuthApps(schoolId, filters);
  }
}
