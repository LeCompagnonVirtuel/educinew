import type { SupabaseClient } from '@supabase/supabase-js';
import type { CertificateRegistryEntry } from '@educi/types';
import { EduOSCertificateRegistryEntryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCertificateRegistryEntryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCertificateRegistryEntry(schoolId: string, id: string): Promise<CertificateRegistryEntry> {
    const item = await this.repo.getCertificateRegistryEntry(schoolId, id);
    if (!item) throw new EduOSCertificateRegistryEntryError(id);
    return item;
  }
  async listCertificateRegistryEntries(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateRegistryEntry[]> {
    return this.repo.listCertificateRegistryEntries(schoolId, filters);
  }
  async createCertificateRegistryEntry(schoolId: string, data: Partial<CertificateRegistryEntry>): Promise<CertificateRegistryEntry> {
    return this.repo.createCertificateRegistryEntry(schoolId, data as any);
  }
  async updateCertificateRegistryEntry(schoolId: string, id: string, data: Partial<CertificateRegistryEntry>): Promise<CertificateRegistryEntry> {
    const existing = await this.repo.getCertificateRegistryEntry(schoolId, id);
    if (!existing) throw new EduOSCertificateRegistryEntryError(id);
    return this.repo.updateCertificateRegistryEntry(schoolId, id, data as any);
  }
  async deleteCertificateRegistryEntry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCertificateRegistryEntry(schoolId, id);
    if (!existing) throw new EduOSCertificateRegistryEntryError(id);
    return this.repo.deleteCertificateRegistryEntry(schoolId, id);
  }
}


