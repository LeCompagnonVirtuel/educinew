import type { SupabaseClient } from '@supabase/supabase-js';
import type { DiplomaLedger } from '@educi/types';
import { EduOSDiplomaLedgerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDiplomaLedgerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDiplomaLedger(schoolId: string, id: string): Promise<DiplomaLedger> {
    const item = await this.repo.getDiplomaLedger(schoolId, id);
    if (!item) throw new EduOSDiplomaLedgerError(id);
    return item;
  }
  async listDiplomaLedgers(schoolId: string, filters?: Record<string, unknown>): Promise<DiplomaLedger[]> {
    return this.repo.listDiplomaLedgers(schoolId, filters);
  }
  async createDiplomaLedger(schoolId: string, data: Partial<DiplomaLedger>): Promise<DiplomaLedger> {
    return this.repo.createDiplomaLedger(schoolId, data as any);
  }
  async updateDiplomaLedger(schoolId: string, id: string, data: Partial<DiplomaLedger>): Promise<DiplomaLedger> {
    const existing = await this.repo.getDiplomaLedger(schoolId, id);
    if (!existing) throw new EduOSDiplomaLedgerError(id);
    return this.repo.updateDiplomaLedger(schoolId, id, data as any);
  }
  async deleteDiplomaLedger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDiplomaLedger(schoolId, id);
    if (!existing) throw new EduOSDiplomaLedgerError(id);
    return this.repo.deleteDiplomaLedger(schoolId, id);
  }
}

