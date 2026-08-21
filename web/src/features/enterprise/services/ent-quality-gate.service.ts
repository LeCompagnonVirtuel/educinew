// Enterprise Platform Service - QualityGate
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { QualityGate, QualityGateCreate } from '@educi/types';
import { EntQualityGateNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQualityGateService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQualityGate(schoolId: string, id: string): Promise<QualityGate> {
    const item = await this.repo.findQualityGateById(schoolId, id);
    if (!item) throw new EntQualityGateNotFoundError(id);
    return item;
  }
  async listQualityGates(schoolId: string, filters?: Record<string, unknown>): Promise<QualityGate[]> {
    return this.repo.findAllQualityGates(schoolId, filters);
  }
  async createQualityGate(schoolId: string, data: QualityGateCreate): Promise<QualityGate> {
    return this.repo.createQualityGate(schoolId, data);
  }
  async updateQualityGate(schoolId: string, id: string, data: Partial<QualityGateCreate>): Promise<QualityGate> {
    const existing = await this.repo.findQualityGateById(schoolId, id);
    if (!existing) throw new EntQualityGateNotFoundError(id);
    return this.repo.updateQualityGate(schoolId, id, data);
  }
  async deleteQualityGate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQualityGateById(schoolId, id);
    if (!existing) throw new EntQualityGateNotFoundError(id);
    return this.repo.deleteQualityGate(schoolId, id);
  }
  async countQualityGates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQualityGates(schoolId, filters);
  }
}
