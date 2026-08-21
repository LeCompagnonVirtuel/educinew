import type { SupabaseClient } from '@supabase/supabase-js';
import type { CertificateLedger } from '@educi/types';
import { EduOSCertificateLedgerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCertificateLedgerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCertificateLedger(schoolId: string, id: string): Promise<CertificateLedger> {
    const item = await this.repo.getCertificateLedger(schoolId, id);
    if (!item) throw new EduOSCertificateLedgerError(id);
    return item;
  }
  async listCertificateLedgers(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateLedger[]> {
    return this.repo.listCertificateLedgers(schoolId, filters);
  }
  async createCertificateLedger(schoolId: string, data: Partial<CertificateLedger>): Promise<CertificateLedger> {
    return this.repo.createCertificateLedger(schoolId, data as any);
  }
  async updateCertificateLedger(schoolId: string, id: string, data: Partial<CertificateLedger>): Promise<CertificateLedger> {
    const existing = await this.repo.getCertificateLedger(schoolId, id);
    if (!existing) throw new EduOSCertificateLedgerError(id);
    return this.repo.updateCertificateLedger(schoolId, id, data as any);
  }
  async deleteCertificateLedger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCertificateLedger(schoolId, id);
    if (!existing) throw new EduOSCertificateLedgerError(id);
    return this.repo.deleteCertificateLedger(schoolId, id);
  }
}

