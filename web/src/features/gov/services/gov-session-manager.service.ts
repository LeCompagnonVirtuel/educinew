// Government & National Governance Service - SessionManager
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SessionManager, SessionManagerCreate } from '@educi/types';
import { GovSessionManagerNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSessionManagerService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSessionManager(schoolId: string, id: string): Promise<SessionManager> {
    const item = await this.repo.findSessionManagerById(schoolId, id);
    if (!item) throw new GovSessionManagerNotFoundError(id);
    return item;
  }

  async listSessionManagers(schoolId: string, filters?: Record<string, unknown>): Promise<SessionManager[]> {
    return this.repo.findAllSessionManagers(schoolId, filters);
  }

  async createSessionManager(schoolId: string, data: SessionManagerCreate): Promise<SessionManager> {
    return this.repo.createSessionManager(schoolId, data);
  }

  async updateSessionManager(schoolId: string, id: string, data: Partial<SessionManagerCreate>): Promise<SessionManager> {
    const existing = await this.repo.findSessionManagerById(schoolId, id);
    if (!existing) throw new GovSessionManagerNotFoundError(id);
    return this.repo.updateSessionManager(schoolId, id, data);
  }

  async deleteSessionManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSessionManagerById(schoolId, id);
    if (!existing) throw new GovSessionManagerNotFoundError(id);
    return this.repo.deleteSessionManager(schoolId, id);
  }

  async countSessionManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSessionManagers(schoolId, filters);
  }
}
