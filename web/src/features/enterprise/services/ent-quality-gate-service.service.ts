// Enterprise Platform Service - QualityGate
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { QualityGate, QualityGateCreate } from '@educi/types';
import { EntQualityGateNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQualityGateServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQualityGateService(schoolId: string, id: string): Promise<QualityGate> {
    const item = await this.repo.findQualityGateServiceById(schoolId, id);
    if (!item) throw new EntQualityGateNotFoundError(id);
    return item;
  }
  async listQualityGateServices(schoolId: string, filters?: Record<string, unknown>): Promise<QualityGate[]> {
    return this.repo.findAllQualityGateServices(schoolId, filters);
  }
  async createQualityGateService(schoolId: string, data: QualityGateCreate): Promise<QualityGate> {
    return this.repo.createQualityGateService(schoolId, data);
  }
  async updateQualityGateService(schoolId: string, id: string, data: Partial<QualityGateCreate>): Promise<QualityGate> {
    const existing = await this.repo.findQualityGateServiceById(schoolId, id);
    if (!existing) throw new EntQualityGateNotFoundError(id);
    return this.repo.updateQualityGateService(schoolId, id, data);
  }
  async deleteQualityGateService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQualityGateServiceById(schoolId, id);
    if (!existing) throw new EntQualityGateNotFoundError(id);
    return this.repo.deleteQualityGateService(schoolId, id);
  }
  async countQualityGateServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQualityGateServices(schoolId, filters);
  }
}
