import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntegrationSyncLog } from '@educi/types';
import { EduOSIntegrationSyncLogError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIntegrationSyncLogService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIntegrationSyncLog(schoolId: string, id: string): Promise<IntegrationSyncLog> {
    const item = await this.repo.getIntegrationSyncLog(schoolId, id);
    if (!item) throw new EduOSIntegrationSyncLogError(id);
    return item;
  }
  async listIntegrationSyncLogs(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationSyncLog[]> {
    return this.repo.listIntegrationSyncLogs(schoolId, filters);
  }
  async createIntegrationSyncLog(schoolId: string, data: Partial<IntegrationSyncLog>): Promise<IntegrationSyncLog> {
    return this.repo.createIntegrationSyncLog(schoolId, data as any);
  }
  async updateIntegrationSyncLog(schoolId: string, id: string, data: Partial<IntegrationSyncLog>): Promise<IntegrationSyncLog> {
    const existing = await this.repo.getIntegrationSyncLog(schoolId, id);
    if (!existing) throw new EduOSIntegrationSyncLogError(id);
    return this.repo.updateIntegrationSyncLog(schoolId, id, data as any);
  }
  async deleteIntegrationSyncLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIntegrationSyncLog(schoolId, id);
    if (!existing) throw new EduOSIntegrationSyncLogError(id);
    return this.repo.deleteIntegrationSyncLog(schoolId, id);
  }
}

