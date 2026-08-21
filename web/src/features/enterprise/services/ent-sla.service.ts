// Enterprise Platform Service - SLA
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SLA, SLACreate } from '@educi/types';
import { EntSlaNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSlaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSla(schoolId: string, id: string): Promise<SLA> {
    const item = await this.repo.findSlaById(schoolId, id);
    if (!item) throw new EntSlaNotFoundError(id);
    return item;
  }
  async listSlas(schoolId: string, filters?: Record<string, unknown>): Promise<SLA[]> {
    return this.repo.findAllSlas(schoolId, filters);
  }
  async createSla(schoolId: string, data: SLACreate): Promise<SLA> {
    return this.repo.createSla(schoolId, data);
  }
  async updateSla(schoolId: string, id: string, data: Partial<SLACreate>): Promise<SLA> {
    const existing = await this.repo.findSlaById(schoolId, id);
    if (!existing) throw new EntSlaNotFoundError(id);
    return this.repo.updateSla(schoolId, id, data);
  }
  async deleteSla(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSlaById(schoolId, id);
    if (!existing) throw new EntSlaNotFoundError(id);
    return this.repo.deleteSla(schoolId, id);
  }
  async countSlas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSlas(schoolId, filters);
  }
}
