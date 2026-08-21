// Enterprise Platform Service - UptimeMonitorsChecks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUptimeCheckService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUptimeMonitorsCheck(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUptimeMonitorsCheckById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUptimeMonitorsChecks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUptimeMonitorsChecks(schoolId, filters);
  }
  async createUptimeMonitorsCheck(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUptimeMonitorsCheck(schoolId, data);
  }
  async updateUptimeMonitorsCheck(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUptimeMonitorsCheckById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUptimeMonitorsCheck(schoolId, id, data);
  }
  async deleteUptimeMonitorsCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUptimeMonitorsCheckById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUptimeMonitorsCheck(schoolId, id);
  }
  async countUptimeMonitorsChecks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUptimeMonitorsChecks(schoolId, filters);
  }
}
