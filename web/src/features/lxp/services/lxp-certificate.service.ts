import type { SupabaseClient } from '@supabase/supabase-js';
import type { Certificate, CertificateCreate } from '@educi/types';
import { LxpCertificateNotFoundError, LxpCertificateCreateError, LxpCertificateRevokeError, LxpCertificateVerifyError, LxpCertificateRenewError, LxpCertificateExpireError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCertificateService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getCertificate(schoolId: string, id: string): Promise<Certificate> {
    const cert = await this.repo.findCertificateById(schoolId, id);
    if (!cert) throw new LxpCertificateNotFoundError(id);
    return cert;
  }

  async listCertificates(schoolId: string, userId: string): Promise<readonly Certificate[]> {
    return this.repo.findCertificates(schoolId, userId);
  }

  async createCertificate(data: CertificateCreate): Promise<Certificate> {
    const created = await this.repo.createCertificate(data);
    if (!created) throw new LxpCertificateCreateError();
    return created;
  }

  async revokeCertificate(schoolId: string, id: string): Promise<Certificate> {
    const existing = await this.repo.findCertificateById(schoolId, id);
    if (!existing) throw new LxpCertificateNotFoundError(id);
    const revoked = await this.repo.revokeCertificate(id);
    if (!revoked) throw new LxpCertificateRevokeError();
    return revoked;
  }

  async verifyCertificate(verificationCode: string): Promise<Certificate> {
    const cert = await this.repo.verifyCertificate(verificationCode);
    if (!cert) throw new LxpCertificateVerifyError();
    return cert;
  }

  async renewCertificate(schoolId: string, id: string): Promise<Certificate> {
    const existing = await this.repo.findCertificateById(schoolId, id);
    if (!existing) throw new LxpCertificateNotFoundError(id);
    const renewed = await this.repo.renewCertificate(id);
    if (!renewed) throw new LxpCertificateRenewError();
    return renewed;
  }
}
