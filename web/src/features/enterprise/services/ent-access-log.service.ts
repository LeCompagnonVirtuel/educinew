// Enterprise Platform Service - AccessLog
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccessLog, AccessLogCreate } from '@educi/types';
import { EntAccessLogNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAccessLogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAccessLog(schoolId: string, id: string): Promise<AccessLog> {
    const item = await this.repo.findAccessLogById(schoolId, id);
    if (!item) throw new EntAccessLogNotFoundError(id);
    return item;
  }
  async listAccessLogs(schoolId: string, filters?: Record<string, unknown>): Promise<AccessLog[]> {
    return this.repo.findAllAccessLogs(schoolId, filters);
  }
  async createAccessLog(schoolId: string, data: AccessLogCreate): Promise<AccessLog> {
    return this.repo.createAccessLog(schoolId, data);
  }
  async updateAccessLog(schoolId: string, id: string, data: Partial<AccessLogCreate>): Promise<AccessLog> {
    const existing = await this.repo.findAccessLogById(schoolId, id);
    if (!existing) throw new EntAccessLogNotFoundError(id);
    return this.repo.updateAccessLog(schoolId, id, data);
  }
  async deleteAccessLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccessLogById(schoolId, id);
    if (!existing) throw new EntAccessLogNotFoundError(id);
    return this.repo.deleteAccessLog(schoolId, id);
  }
  async countAccessLogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccessLogs(schoolId, filters);
  }
}
