// Enterprise Platform Service - IncidentManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IncidentManager, IncidentManagerCreate } from '@educi/types';
import { EntIncidentManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIncidentManager(schoolId: string, id: string): Promise<IncidentManager> {
    const item = await this.repo.findIncidentManagerById(schoolId, id);
    if (!item) throw new EntIncidentManagerNotFoundError(id);
    return item;
  }
  async listIncidentManagers(schoolId: string, filters?: Record<string, unknown>): Promise<IncidentManager[]> {
    return this.repo.findAllIncidentManagers(schoolId, filters);
  }
  async createIncidentManager(schoolId: string, data: IncidentManagerCreate): Promise<IncidentManager> {
    return this.repo.createIncidentManager(schoolId, data);
  }
  async updateIncidentManager(schoolId: string, id: string, data: Partial<IncidentManagerCreate>): Promise<IncidentManager> {
    const existing = await this.repo.findIncidentManagerById(schoolId, id);
    if (!existing) throw new EntIncidentManagerNotFoundError(id);
    return this.repo.updateIncidentManager(schoolId, id, data);
  }
  async deleteIncidentManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIncidentManagerById(schoolId, id);
    if (!existing) throw new EntIncidentManagerNotFoundError(id);
    return this.repo.deleteIncidentManager(schoolId, id);
  }
  async countIncidentManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIncidentManagers(schoolId, filters);
  }
}
