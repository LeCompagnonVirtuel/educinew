import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalBadge, BadgeCreate } from '@educi/types';
import { LxpBadgeNotFoundError, LxpBadgeCreateError, LxpBadgeAwardError, LxpBadgeRevokeError, LxpBadgeVerifyError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpBadgeService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getBadge(schoolId: string, id: string): Promise<DigitalBadge> {
    const badge = await this.repo.findBadgeById(schoolId, id);
    if (!badge) throw new LxpBadgeNotFoundError(id);
    return badge;
  }

  async listBadges(schoolId: string): Promise<readonly DigitalBadge[]> {
    return this.repo.findBadges(schoolId);
  }

  async createBadge(data: BadgeCreate): Promise<DigitalBadge> {
    const created = await this.repo.createBadge(data);
    if (!created) throw new LxpBadgeCreateError();
    return created;
  }

  async awardBadge(schoolId: string, id: string, userId: string): Promise<DigitalBadge> {
    const existing = await this.repo.findBadgeById(schoolId, id);
    if (!existing) throw new LxpBadgeNotFoundError(id);
    const awarded = await this.repo.awardBadge(id, userId);
    if (!awarded) throw new LxpBadgeAwardError();
    return awarded;
  }

  async verifyBadge(verificationCode: string): Promise<DigitalBadge> {
    const badge = await this.repo.verifyBadge(verificationCode);
    if (!badge) throw new LxpBadgeVerifyError();
    return badge;
  }
}
