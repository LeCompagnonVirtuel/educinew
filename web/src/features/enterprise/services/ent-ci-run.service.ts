// Enterprise Platform Service - CIRun
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CIRun, CIRunCreate } from '@educi/types';
import { EntCIRunNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCIRunService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCIRun(schoolId: string, id: string): Promise<CIRun> {
    const item = await this.repo.findCIRunById(schoolId, id);
    if (!item) throw new EntCIRunNotFoundError(id);
    return item;
  }
  async listCIRuns(schoolId: string, filters?: Record<string, unknown>): Promise<CIRun[]> {
    return this.repo.findAllCIRuns(schoolId, filters);
  }
  async createCIRun(schoolId: string, data: CIRunCreate): Promise<CIRun> {
    return this.repo.createCIRun(schoolId, data);
  }
  async updateCIRun(schoolId: string, id: string, data: Partial<CIRunCreate>): Promise<CIRun> {
    const existing = await this.repo.findCIRunById(schoolId, id);
    if (!existing) throw new EntCIRunNotFoundError(id);
    return this.repo.updateCIRun(schoolId, id, data);
  }
  async deleteCIRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCIRunById(schoolId, id);
    if (!existing) throw new EntCIRunNotFoundError(id);
    return this.repo.deleteCIRun(schoolId, id);
  }
  async countCIRuns(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCIRuns(schoolId, filters);
  }
}
