// Enterprise Platform Service - SLO
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SLO, SLOCreate } from '@educi/types';
import { EntSloNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSloService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSlo(schoolId: string, id: string): Promise<SLO> {
    const item = await this.repo.findSloById(schoolId, id);
    if (!item) throw new EntSloNotFoundError(id);
    return item;
  }
  async listSlos(schoolId: string, filters?: Record<string, unknown>): Promise<SLO[]> {
    return this.repo.findAllSlos(schoolId, filters);
  }
  async createSlo(schoolId: string, data: SLOCreate): Promise<SLO> {
    return this.repo.createSlo(schoolId, data);
  }
  async updateSlo(schoolId: string, id: string, data: Partial<SLOCreate>): Promise<SLO> {
    const existing = await this.repo.findSloById(schoolId, id);
    if (!existing) throw new EntSloNotFoundError(id);
    return this.repo.updateSlo(schoolId, id, data);
  }
  async deleteSlo(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSloById(schoolId, id);
    if (!existing) throw new EntSloNotFoundError(id);
    return this.repo.deleteSlo(schoolId, id);
  }
  async countSlos(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSlos(schoolId, filters);
  }
}
