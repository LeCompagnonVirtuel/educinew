import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityVerification, IdentityVerificationCreate } from '@educi/types';
import { ScIdentityVerificationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScIdentityVerificationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getVerification(schoolId: string, id: string): Promise<IdentityVerification> {
    const verification = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!verification) throw new ScIdentityVerificationNotFoundError(id);
    return verification;
  }

  async listVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    return this.repo.findAllIdentityVerifications(schoolId, filters);
  }

  async createVerification(schoolId: string, data: IdentityVerificationCreate): Promise<IdentityVerification> {
    return this.repo.createIdentityVerification(schoolId, data);
  }

  async updateVerification(schoolId: string, id: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification> {
    const existing = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!existing) throw new ScIdentityVerificationNotFoundError(id);
    return this.repo.updateIdentityVerification(schoolId, id, data);
  }

  async deleteVerification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!existing) throw new ScIdentityVerificationNotFoundError(id);
    return this.repo.deleteIdentityVerification(schoolId, id);
  }

  async countVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityVerifications(schoolId, filters);
  }
}
