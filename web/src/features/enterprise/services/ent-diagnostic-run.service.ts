// Enterprise Platform Service - DiagnosticRun
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DiagnosticRun, DiagnosticRunCreate } from '@educi/types';
import { EntDiagnosticRunNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDiagnosticRunService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDiagnosticRun(schoolId: string, id: string): Promise<DiagnosticRun> {
    const item = await this.repo.findDiagnosticRunById(schoolId, id);
    if (!item) throw new EntDiagnosticRunNotFoundError(id);
    return item;
  }
  async listDiagnosticRuns(schoolId: string, filters?: Record<string, unknown>): Promise<DiagnosticRun[]> {
    return this.repo.findAllDiagnosticRuns(schoolId, filters);
  }
  async createDiagnosticRun(schoolId: string, data: DiagnosticRunCreate): Promise<DiagnosticRun> {
    return this.repo.createDiagnosticRun(schoolId, data);
  }
  async updateDiagnosticRun(schoolId: string, id: string, data: Partial<DiagnosticRunCreate>): Promise<DiagnosticRun> {
    const existing = await this.repo.findDiagnosticRunById(schoolId, id);
    if (!existing) throw new EntDiagnosticRunNotFoundError(id);
    return this.repo.updateDiagnosticRun(schoolId, id, data);
  }
  async deleteDiagnosticRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDiagnosticRunById(schoolId, id);
    if (!existing) throw new EntDiagnosticRunNotFoundError(id);
    return this.repo.deleteDiagnosticRun(schoolId, id);
  }
  async countDiagnosticRuns(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDiagnosticRuns(schoolId, filters);
  }
}
