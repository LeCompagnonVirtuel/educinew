import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataGovernance } from '@educi/types';
import { EduOSDataGovernanceError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataGovernanceService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataGovernance(schoolId: string, id: string): Promise<DataGovernance> {
    const item = await this.repo.getDataGovernance(schoolId, id);
    if (!item) throw new EduOSDataGovernanceError(id);
    return item;
  }
  async listDataGovernances(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernance[]> {
    return this.repo.listDataGovernances(schoolId, filters);
  }
  async createDataGovernance(schoolId: string, data: Partial<DataGovernance>): Promise<DataGovernance> {
    return this.repo.createDataGovernance(schoolId, data as any);
  }
  async updateDataGovernance(schoolId: string, id: string, data: Partial<DataGovernance>): Promise<DataGovernance> {
    const existing = await this.repo.getDataGovernance(schoolId, id);
    if (!existing) throw new EduOSDataGovernanceError(id);
    return this.repo.updateDataGovernance(schoolId, id, data as any);
  }
  async deleteDataGovernance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataGovernance(schoolId, id);
    if (!existing) throw new EduOSDataGovernanceError(id);
    return this.repo.deleteDataGovernance(schoolId, id);
  }
}

