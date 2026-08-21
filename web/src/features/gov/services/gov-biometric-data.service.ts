// Government & National Governance Service - BiometricData
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BiometricData, BiometricDataCreate } from '@educi/types';
import { GovBiometricDataNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovBiometricDataService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getBiometricData(schoolId: string, id: string): Promise<BiometricData> {
    const item = await this.repo.findBiometricDataById(schoolId, id);
    if (!item) throw new GovBiometricDataNotFoundError(id);
    return item;
  }

  async listBiometricData(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricData[]> {
    return this.repo.findAllBiometricData(schoolId, filters);
  }

  async createBiometricData(schoolId: string, data: BiometricDataCreate): Promise<BiometricData> {
    return this.repo.createBiometricData(schoolId, data);
  }

  async updateBiometricData(schoolId: string, id: string, data: Partial<BiometricDataCreate>): Promise<BiometricData> {
    const existing = await this.repo.findBiometricDataById(schoolId, id);
    if (!existing) throw new GovBiometricDataNotFoundError(id);
    return this.repo.updateBiometricData(schoolId, id, data);
  }

  async deleteBiometricData(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBiometricDataById(schoolId, id);
    if (!existing) throw new GovBiometricDataNotFoundError(id);
    return this.repo.deleteBiometricData(schoolId, id);
  }

  async countBiometricData(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBiometricData(schoolId, filters);
  }
}
