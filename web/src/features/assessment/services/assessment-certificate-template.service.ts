import type { SupabaseClient } from '@supabase/supabase-js';
import type { CertificateTemplate, CertificateTemplateCreate } from '@educi/types';
import { AssessmentCertificateTemplateError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentCertificateTemplateService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getCertificateTemplate(schoolId: string, id: string): Promise<CertificateTemplate> {
    const item = await this.repo.getCertificateTemplate(id, schoolId);
    if (!item) throw new AssessmentCertificateTemplateError(id);
    return item;
  }
  async listCertificateTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<CertificateTemplate[]> {
    return this.repo.listCertificateTemplates(schoolId, filters);
  }
  async createCertificateTemplate(schoolId: string, data: CertificateTemplateCreate): Promise<CertificateTemplate> {
    return this.repo.createCertificateTemplate({ ...data, school_id: schoolId } as any);
  }
  async updateCertificateTemplate(schoolId: string, id: string, data: Partial<CertificateTemplateCreate>): Promise<CertificateTemplate> {
    const existing = await this.repo.getCertificateTemplate(id, schoolId);
    if (!existing) throw new AssessmentCertificateTemplateError(id);
    return this.repo.updateCertificateTemplate(id, schoolId, data as any);
  }
  async deleteCertificateTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCertificateTemplate(id, schoolId);
    if (!existing) throw new AssessmentCertificateTemplateError(id);
    return this.repo.deleteCertificateTemplate(id, schoolId);
  }
}
