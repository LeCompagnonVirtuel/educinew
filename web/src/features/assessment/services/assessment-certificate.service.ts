import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certificate, CertificateCreate } from '@educi/types';
import { AssessmentCertificateNotFoundError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentCertificateService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getCertificate(schoolId: string, id: string): Promise<Certificate> {
    const item = await this.repo.getCertificate(id, schoolId);
    if (!item) throw new AssessmentCertificateNotFoundError(id);
    return item;
  }
  async listCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<Certificate[]> {
    return this.repo.listCertificates(schoolId, filters);
  }
  async createCertificate(schoolId: string, data: CertificateCreate): Promise<Certificate> {
    return this.repo.createCertificate({ ...data, school_id: schoolId } as any);
  }
  async updateCertificate(schoolId: string, id: string, data: Partial<CertificateCreate>): Promise<Certificate> {
    const existing = await this.repo.getCertificate(id, schoolId);
    if (!existing) throw new AssessmentCertificateNotFoundError(id);
    return this.repo.updateCertificate(id, schoolId, data as any);
  }
  async deleteCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCertificate(id, schoolId);
    if (!existing) throw new AssessmentCertificateNotFoundError(id);
    return this.repo.deleteCertificate(id, schoolId);
  }
}
