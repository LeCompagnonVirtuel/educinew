import type { SupabaseClient } from '@supabase/supabase-js';
import type { RiskRegister } from '@educi/types';
import { EduOSRiskRegisterError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRiskRegisterService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRiskRegister(schoolId: string, id: string): Promise<RiskRegister> {
    const item = await this.repo.getRiskRegister(schoolId, id);
    if (!item) throw new EduOSRiskRegisterError(id);
    return item;
  }
  async listRiskRegisters(schoolId: string, filters?: Record<string, unknown>): Promise<RiskRegister[]> {
    return this.repo.listRiskRegisters(schoolId, filters);
  }
  async createRiskRegister(schoolId: string, data: Partial<RiskRegister>): Promise<RiskRegister> {
    return this.repo.createRiskRegister(schoolId, data as any);
  }
  async updateRiskRegister(schoolId: string, id: string, data: Partial<RiskRegister>): Promise<RiskRegister> {
    const existing = await this.repo.getRiskRegister(schoolId, id);
    if (!existing) throw new EduOSRiskRegisterError(id);
    return this.repo.updateRiskRegister(schoolId, id, data as any);
  }
  async deleteRiskRegister(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRiskRegister(schoolId, id);
    if (!existing) throw new EduOSRiskRegisterError(id);
    return this.repo.deleteRiskRegister(schoolId, id);
  }
}

