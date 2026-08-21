import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicLedger } from '@educi/types';
import { EduOSAcademicLedgerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAcademicLedgerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAcademicLedger(schoolId: string, id: string): Promise<AcademicLedger> {
    const item = await this.repo.getAcademicLedger(schoolId, id);
    if (!item) throw new EduOSAcademicLedgerError(id);
    return item;
  }
  async listAcademicLedgers(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicLedger[]> {
    return this.repo.listAcademicLedgers(schoolId, filters);
  }
  async createAcademicLedger(schoolId: string, data: Partial<AcademicLedger>): Promise<AcademicLedger> {
    return this.repo.createAcademicLedger(schoolId, data as any);
  }
  async updateAcademicLedger(schoolId: string, id: string, data: Partial<AcademicLedger>): Promise<AcademicLedger> {
    const existing = await this.repo.getAcademicLedger(schoolId, id);
    if (!existing) throw new EduOSAcademicLedgerError(id);
    return this.repo.updateAcademicLedger(schoolId, id, data as any);
  }
  async deleteAcademicLedger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAcademicLedger(schoolId, id);
    if (!existing) throw new EduOSAcademicLedgerError(id);
    return this.repo.deleteAcademicLedger(schoolId, id);
  }
}

