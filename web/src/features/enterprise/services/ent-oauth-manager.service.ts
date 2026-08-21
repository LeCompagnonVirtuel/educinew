// Enterprise Platform Service - OAuthManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { OAuthManager, OAuthManagerCreate } from '@educi/types';
import { EntOAuthManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntOAuthManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOAuthManager(schoolId: string, id: string): Promise<OAuthManager> {
    const item = await this.repo.findOAuthManagerById(schoolId, id);
    if (!item) throw new EntOAuthManagerNotFoundError(id);
    return item;
  }
  async listOAuthManagers(schoolId: string, filters?: Record<string, unknown>): Promise<OAuthManager[]> {
    return this.repo.findAllOAuthManagers(schoolId, filters);
  }
  async createOAuthManager(schoolId: string, data: OAuthManagerCreate): Promise<OAuthManager> {
    return this.repo.createOAuthManager(schoolId, data);
  }
  async updateOAuthManager(schoolId: string, id: string, data: Partial<OAuthManagerCreate>): Promise<OAuthManager> {
    const existing = await this.repo.findOAuthManagerById(schoolId, id);
    if (!existing) throw new EntOAuthManagerNotFoundError(id);
    return this.repo.updateOAuthManager(schoolId, id, data);
  }
  async deleteOAuthManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOAuthManagerById(schoolId, id);
    if (!existing) throw new EntOAuthManagerNotFoundError(id);
    return this.repo.deleteOAuthManager(schoolId, id);
  }
  async countOAuthManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOAuthManagers(schoolId, filters);
  }
}
