import type { SupabaseClient } from '@supabase/supabase-js';
import type { Verification, BlockchainVerification, QRVerification } from '@educi/types';
import { LxpCertificateVerifyError, LxpQRCodeGenerateError, LxpQRCodeVerifyError, LxpBlockchainNotReadyError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpVerificationService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async verifyCredential(credentialId: string, credentialType: string): Promise<Verification> {
    const verification = await this.repo.verifyCredential(credentialId, credentialType);
    if (!verification) throw new LxpCertificateVerifyError();
    return verification;
  }

  async generateQRCode(credentialId: string): Promise<QRVerification> {
    const qr = await this.repo.generateQRCode(credentialId);
    if (!qr) throw new LxpQRCodeGenerateError();
    return qr;
  }

  async verifyQRCode(code: string): Promise<Verification> {
    const verification = await this.repo.verifyQRCode(code);
    if (!verification) throw new LxpQRCodeVerifyError();
    return verification;
  }

  async anchorToBlockchain(credentialId: string): Promise<BlockchainVerification> {
    const anchor = await this.repo.anchorCredentialToBlockchain(credentialId);
    if (!anchor) throw new LxpBlockchainNotReadyError();
    return anchor;
  }

  async getVerificationHistory(credentialId: string): Promise<readonly Verification[]> {
    return this.repo.getVerificationHistory(credentialId);
  }
}
