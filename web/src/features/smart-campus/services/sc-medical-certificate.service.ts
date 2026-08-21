import type { SupabaseClient } from '@supabase/supabase-js';
import type { MedicalCertificate, MedicalCertificateCreate } from '@educi/types';
import { ScCertificateNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMedicalCertificateService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getCertificate(schoolId: string, id: string): Promise<MedicalCertificate> {
    const certificate = await this.repo.findMedicalCertificateById(schoolId, id);
    if (!certificate) throw new ScCertificateNotFoundError(id);
    return certificate;
  }

  async listCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<MedicalCertificate[]> {
    return this.repo.findAllMedicalCertificates(schoolId, filters);
  }

  async createCertificate(schoolId: string, data: MedicalCertificateCreate): Promise<MedicalCertificate> {
    return this.repo.createMedicalCertificate(schoolId, data);
  }

  async updateCertificate(schoolId: string, id: string, data: Partial<MedicalCertificateCreate>): Promise<MedicalCertificate> {
    const existing = await this.repo.findMedicalCertificateById(schoolId, id);
    if (!existing) throw new ScCertificateNotFoundError(id);
    return this.repo.updateMedicalCertificate(schoolId, id, data);
  }

  async deleteCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMedicalCertificateById(schoolId, id);
    if (!existing) throw new ScCertificateNotFoundError(id);
    return this.repo.deleteMedicalCertificate(schoolId, id);
  }

  async countCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMedicalCertificates(schoolId, filters);
  }
}
