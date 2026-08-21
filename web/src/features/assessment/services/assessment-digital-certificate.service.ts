import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalCertificate, DigitalCertificateCreate } from '@educi/types';
import { AssessmentDigitalCertificateError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentDigitalCertificateService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getDigitalCertificate(schoolId: string, id: string): Promise<DigitalCertificate> {
    const item = await this.repo.getDigitalCertificate(id, schoolId);
    if (!item) throw new AssessmentDigitalCertificateError(id);
    return item;
  }
  async listDigitalCertificates(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalCertificate[]> {
    return this.repo.listDigitalCertificates(schoolId, filters);
  }
  async createDigitalCertificate(schoolId: string, data: DigitalCertificateCreate): Promise<DigitalCertificate> {
    return this.repo.createDigitalCertificate({ ...data, school_id: schoolId } as any);
  }
  async updateDigitalCertificate(schoolId: string, id: string, data: Partial<DigitalCertificateCreate>): Promise<DigitalCertificate> {
    const existing = await this.repo.getDigitalCertificate(id, schoolId);
    if (!existing) throw new AssessmentDigitalCertificateError(id);
    return this.repo.updateDigitalCertificate(id, schoolId, data as any);
  }
  async deleteDigitalCertificate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDigitalCertificate(id, schoolId);
    if (!existing) throw new AssessmentDigitalCertificateError(id);
    return this.repo.deleteDigitalCertificate(id, schoolId);
  }
}
