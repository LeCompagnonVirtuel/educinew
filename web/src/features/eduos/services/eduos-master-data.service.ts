import type { SupabaseClient } from '@supabase/supabase-js';
import type { MasterData } from '@educi/types';
import { EduOSMasterDataError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMasterDataService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMasterData(schoolId: string, id: string): Promise<MasterData> {
    const item = await this.repo.getMasterData(schoolId, id);
    if (!item) throw new EduOSMasterDataError(id);
    return item;
  }
  async listMasterDatas(schoolId: string, filters?: Record<string, unknown>): Promise<MasterData[]> {
    return this.repo.listMasterDatas(schoolId, filters);
  }
  async createMasterData(schoolId: string, data: Partial<MasterData>): Promise<MasterData> {
    return this.repo.createMasterData(schoolId, data as any);
  }
  async updateMasterData(schoolId: string, id: string, data: Partial<MasterData>): Promise<MasterData> {
    const existing = await this.repo.getMasterData(schoolId, id);
    if (!existing) throw new EduOSMasterDataError(id);
    return this.repo.updateMasterData(schoolId, id, data as any);
  }
  async deleteMasterData(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMasterData(schoolId, id);
    if (!existing) throw new EduOSMasterDataError(id);
    return this.repo.deleteMasterData(schoolId, id);
  }
}

