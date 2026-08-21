import type { SupabaseClient } from '@supabase/supabase-js';
import type { SmartContract } from '@educi/types';
import { EduOSSmartContractError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSmartContractService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSmartContract(schoolId: string, id: string): Promise<SmartContract> {
    const item = await this.repo.getSmartContract(schoolId, id);
    if (!item) throw new EduOSSmartContractError(id);
    return item;
  }
  async listSmartContracts(schoolId: string, filters?: Record<string, unknown>): Promise<SmartContract[]> {
    return this.repo.listSmartContracts(schoolId, filters);
  }
  async createSmartContract(schoolId: string, data: Partial<SmartContract>): Promise<SmartContract> {
    return this.repo.createSmartContract(schoolId, data as any);
  }
  async updateSmartContract(schoolId: string, id: string, data: Partial<SmartContract>): Promise<SmartContract> {
    const existing = await this.repo.getSmartContract(schoolId, id);
    if (!existing) throw new EduOSSmartContractError(id);
    return this.repo.updateSmartContract(schoolId, id, data as any);
  }
  async deleteSmartContract(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSmartContract(schoolId, id);
    if (!existing) throw new EduOSSmartContractError(id);
    return this.repo.deleteSmartContract(schoolId, id);
  }
}

