import type { SupabaseClient } from '@supabase/supabase-js';
import type { MicroCredential } from '@educi/types';
import { LxpMicroCredentialNotFoundError, LxpMicroCredentialCreateError, LxpMicroCredentialAwardError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpMicroCredentialService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getMicroCredential(schoolId: string, id: string): Promise<MicroCredential> {
    const cred = await this.repo.findMicroCredentialById(schoolId, id);
    if (!cred) throw new LxpMicroCredentialNotFoundError(id);
    return cred;
  }

  async listMicroCredentials(schoolId: string): Promise<readonly MicroCredential[]> {
    return this.repo.findMicroCredentials(schoolId);
  }

  async createMicroCredential(data: Omit<MicroCredential, 'id' | 'createdAt' | 'updatedAt' | 'issuedCount' | 'status'>): Promise<MicroCredential> {
    const created = await this.repo.createMicroCredential(data);
    if (!created) throw new LxpMicroCredentialCreateError();
    return created;
  }

  async awardMicroCredential(schoolId: string, id: string, userId: string): Promise<boolean> {
    const existing = await this.repo.findMicroCredentialById(schoolId, id);
    if (!existing) throw new LxpMicroCredentialNotFoundError(id);
    const awarded = await this.repo.awardMicroCredential(id, userId);
    if (!awarded) throw new LxpMicroCredentialAwardError();
    return awarded;
  }

  async deleteMicroCredential(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMicroCredentialById(schoolId, id);
    if (!existing) throw new LxpMicroCredentialNotFoundError(id);
    await this.repo.deleteMicroCredential(id);
  }
}
