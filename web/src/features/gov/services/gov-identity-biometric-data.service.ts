import type { SupabaseClient } from '@supabase/supabase-js';
import type { BiometricData, BiometricDataCreate } from '@educi/types';
import { GovBiometricDataNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityBiometricDataService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<BiometricData> {
    const item = await this.repo.findBiometricDataById(schoolId, id);
    if (!item) throw new GovBiometricDataNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricData[]> {
    return this.repo.findAllBiometricData(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<BiometricDataCreate>): Promise<BiometricData> {
    return this.repo.createBiometricData(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<BiometricDataCreate>): Promise<BiometricData> {
    const existing = await this.repo.findBiometricDataById(schoolId, id);
    if (!existing) throw new GovBiometricDataNotFoundError(id);
    return this.repo.updateBiometricData(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBiometricDataById(schoolId, id);
    if (!existing) throw new GovBiometricDataNotFoundError(id);
    return this.repo.deleteBiometricData(schoolId, id);
  }
}
