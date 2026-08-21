import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityAccessLog } from '@educi/types';
import { EduOSIdentityAccessLogError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIdentityAccessLogService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIdentityAccessLog(schoolId: string, id: string): Promise<IdentityAccessLog> {
    const item = await this.repo.getIdentityAccessLog(schoolId, id);
    if (!item) throw new EduOSIdentityAccessLogError(id);
    return item;
  }
  async listIdentityAccessLogs(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAccessLog[]> {
    return this.repo.listIdentityAccessLogs(schoolId, filters);
  }
  async createIdentityAccessLog(schoolId: string, data: Partial<IdentityAccessLog>): Promise<IdentityAccessLog> {
    return this.repo.createIdentityAccessLog(schoolId, data as any);
  }
  async updateIdentityAccessLog(schoolId: string, id: string, data: Partial<IdentityAccessLog>): Promise<IdentityAccessLog> {
    const existing = await this.repo.getIdentityAccessLog(schoolId, id);
    if (!existing) throw new EduOSIdentityAccessLogError(id);
    return this.repo.updateIdentityAccessLog(schoolId, id, data as any);
  }
  async deleteIdentityAccessLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityAccessLog(schoolId, id);
    if (!existing) throw new EduOSIdentityAccessLogError(id);
    return this.repo.deleteIdentityAccessLog(schoolId, id);
  }
}

