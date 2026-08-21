import type { SupabaseClient } from '@supabase/supabase-js';
import type { PDF } from '@educi/types';
import { LxpPDFNotFoundError, LxpPDFUploadError, LxpPDFRenderError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpPDFService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getPDF(schoolId: string, id: string): Promise<PDF> {
    const pdf = await this.repo.findPDFById(schoolId, id);
    if (!pdf) throw new LxpPDFNotFoundError(id);
    return pdf;
  }

  async listPDFs(courseId: string): Promise<readonly PDF[]> {
    return this.repo.findPDFs(courseId);
  }

  async uploadPDF(courseId: string, file: File, title: string): Promise<PDF> {
    const pdf = await this.repo.uploadPDF(courseId, file, title);
    if (!pdf) throw new LxpPDFUploadError();
    return pdf;
  }

  async getRenderUrl(schoolId: string, id: string): Promise<string> {
    const pdf = await this.repo.findPDFById(schoolId, id);
    if (!pdf) throw new LxpPDFNotFoundError(id);
    const url = await this.repo.getPDFRenderUrl(id);
    if (!url) throw new LxpPDFRenderError();
    return url;
  }

  async deletePDF(schoolId: string, id: string): Promise<void> {
    const pdf = await this.repo.findPDFById(schoolId, id);
    if (!pdf) throw new LxpPDFNotFoundError(id);
    await this.repo.deletePDF(id);
  }
}
