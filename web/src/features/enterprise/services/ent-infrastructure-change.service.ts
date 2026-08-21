// Enterprise Platform Service - InfrastructureChange
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfrastructureChange, InfrastructureChangeCreate } from '@educi/types';
import { EntInfrastructureChangeNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntInfrastructureChangeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getInfrastructureChange(schoolId: string, id: string): Promise<InfrastructureChange> {
    const item = await this.repo.findInfrastructureChangeById(schoolId, id);
    if (!item) throw new EntInfrastructureChangeNotFoundError(id);
    return item;
  }
  async listInfrastructureChanges(schoolId: string, filters?: Record<string, unknown>): Promise<InfrastructureChange[]> {
    return this.repo.findAllInfrastructureChanges(schoolId, filters);
  }
  async createInfrastructureChange(schoolId: string, data: InfrastructureChangeCreate): Promise<InfrastructureChange> {
    return this.repo.createInfrastructureChange(schoolId, data);
  }
  async updateInfrastructureChange(schoolId: string, id: string, data: Partial<InfrastructureChangeCreate>): Promise<InfrastructureChange> {
    const existing = await this.repo.findInfrastructureChangeById(schoolId, id);
    if (!existing) throw new EntInfrastructureChangeNotFoundError(id);
    return this.repo.updateInfrastructureChange(schoolId, id, data);
  }
  async deleteInfrastructureChange(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInfrastructureChangeById(schoolId, id);
    if (!existing) throw new EntInfrastructureChangeNotFoundError(id);
    return this.repo.deleteInfrastructureChange(schoolId, id);
  }
  async countInfrastructureChanges(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInfrastructureChanges(schoolId, filters);
  }
}
