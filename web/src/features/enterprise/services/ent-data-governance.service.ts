// Enterprise Platform Service - DataGovernance
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataGovernance, DataGovernanceCreate } from '@educi/types';
import { EntDataGovernanceNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataGovernanceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataGovernance(schoolId: string, id: string): Promise<DataGovernance> {
    const item = await this.repo.findDataGovernanceById(schoolId, id);
    if (!item) throw new EntDataGovernanceNotFoundError(id);
    return item;
  }
  async listDataGovernances(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernance[]> {
    return this.repo.findAllDataGovernances(schoolId, filters);
  }
  async createDataGovernance(schoolId: string, data: DataGovernanceCreate): Promise<DataGovernance> {
    return this.repo.createDataGovernance(schoolId, data);
  }
  async updateDataGovernance(schoolId: string, id: string, data: Partial<DataGovernanceCreate>): Promise<DataGovernance> {
    const existing = await this.repo.findDataGovernanceById(schoolId, id);
    if (!existing) throw new EntDataGovernanceNotFoundError(id);
    return this.repo.updateDataGovernance(schoolId, id, data);
  }
  async deleteDataGovernance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataGovernanceById(schoolId, id);
    if (!existing) throw new EntDataGovernanceNotFoundError(id);
    return this.repo.deleteDataGovernance(schoolId, id);
  }
  async countDataGovernances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataGovernances(schoolId, filters);
  }
}
