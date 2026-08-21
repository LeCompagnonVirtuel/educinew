// Enterprise Platform Service - DistributedTrace
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DistributedTrace, DistributedTraceCreate } from '@educi/types';
import { EntDistributedTraceNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDistributedTraceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDistributedTrace(schoolId: string, id: string): Promise<DistributedTrace> {
    const item = await this.repo.findDistributedTraceById(schoolId, id);
    if (!item) throw new EntDistributedTraceNotFoundError(id);
    return item;
  }
  async listDistributedTraces(schoolId: string, filters?: Record<string, unknown>): Promise<DistributedTrace[]> {
    return this.repo.findAllDistributedTraces(schoolId, filters);
  }
  async createDistributedTrace(schoolId: string, data: DistributedTraceCreate): Promise<DistributedTrace> {
    return this.repo.createDistributedTrace(schoolId, data);
  }
  async updateDistributedTrace(schoolId: string, id: string, data: Partial<DistributedTraceCreate>): Promise<DistributedTrace> {
    const existing = await this.repo.findDistributedTraceById(schoolId, id);
    if (!existing) throw new EntDistributedTraceNotFoundError(id);
    return this.repo.updateDistributedTrace(schoolId, id, data);
  }
  async deleteDistributedTrace(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDistributedTraceById(schoolId, id);
    if (!existing) throw new EntDistributedTraceNotFoundError(id);
    return this.repo.deleteDistributedTrace(schoolId, id);
  }
  async countDistributedTraces(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDistributedTraces(schoolId, filters);
  }
}
