// Enterprise Platform Service - DiagnosticRunner
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DiagnosticRunner, DiagnosticRunnerCreate } from '@educi/types';
import { EntDiagnosticRunnerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDiagnosticRunnerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDiagnosticRunner(schoolId: string, id: string): Promise<DiagnosticRunner> {
    const item = await this.repo.findDiagnosticRunnerById(schoolId, id);
    if (!item) throw new EntDiagnosticRunnerNotFoundError(id);
    return item;
  }
  async listDiagnosticRunners(schoolId: string, filters?: Record<string, unknown>): Promise<DiagnosticRunner[]> {
    return this.repo.findAllDiagnosticRunners(schoolId, filters);
  }
  async createDiagnosticRunner(schoolId: string, data: DiagnosticRunnerCreate): Promise<DiagnosticRunner> {
    return this.repo.createDiagnosticRunner(schoolId, data);
  }
  async updateDiagnosticRunner(schoolId: string, id: string, data: Partial<DiagnosticRunnerCreate>): Promise<DiagnosticRunner> {
    const existing = await this.repo.findDiagnosticRunnerById(schoolId, id);
    if (!existing) throw new EntDiagnosticRunnerNotFoundError(id);
    return this.repo.updateDiagnosticRunner(schoolId, id, data);
  }
  async deleteDiagnosticRunner(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDiagnosticRunnerById(schoolId, id);
    if (!existing) throw new EntDiagnosticRunnerNotFoundError(id);
    return this.repo.deleteDiagnosticRunner(schoolId, id);
  }
  async countDiagnosticRunners(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDiagnosticRunners(schoolId, filters);
  }
}
