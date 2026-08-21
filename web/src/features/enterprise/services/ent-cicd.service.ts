// Enterprise Platform Service - CICD
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CICD, CICDCreate } from '@educi/types';
import { EntCICDNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCICDService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCICD(schoolId: string, id: string): Promise<CICD> {
    const item = await this.repo.findCICDById(schoolId, id);
    if (!item) throw new EntCICDNotFoundError(id);
    return item;
  }
  async listCICDs(schoolId: string, filters?: Record<string, unknown>): Promise<CICD[]> {
    return this.repo.findAllCICDs(schoolId, filters);
  }
  async createCICD(schoolId: string, data: CICDCreate): Promise<CICD> {
    return this.repo.createCICD(schoolId, data);
  }
  async updateCICD(schoolId: string, id: string, data: Partial<CICDCreate>): Promise<CICD> {
    const existing = await this.repo.findCICDById(schoolId, id);
    if (!existing) throw new EntCICDNotFoundError(id);
    return this.repo.updateCICD(schoolId, id, data);
  }
  async deleteCICD(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCICDById(schoolId, id);
    if (!existing) throw new EntCICDNotFoundError(id);
    return this.repo.deleteCICD(schoolId, id);
  }
  async countCICDs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCICDs(schoolId, filters);
  }
}
