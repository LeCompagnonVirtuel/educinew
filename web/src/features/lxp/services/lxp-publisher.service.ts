import type { SupabaseClient } from '@supabase/supabase-js';
import type { PublisherAccount, PublisherApplication } from '@educi/types';
import { LxpPublisherNotFoundError, LxpPublisherApplyError, LxpPublisherApproveError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpPublisherService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getPublisher(schoolId: string, id: string): Promise<PublisherAccount> {
    const publisher = await this.repo.findPublisherById(schoolId, id);
    if (!publisher) throw new LxpPublisherNotFoundError(id);
    return publisher;
  }

  async listPublishers(schoolId: string): Promise<readonly PublisherAccount[]> {
    return this.repo.findPublishers(schoolId);
  }

  async applyAsPublisher(data: Omit<PublisherApplication, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'submittedAt'>): Promise<PublisherApplication> {
    const application = await this.repo.applyAsPublisher(data);
    if (!application) throw new LxpPublisherApplyError();
    return application;
  }

  async approvePublisher(schoolId: string, id: string): Promise<PublisherAccount> {
    const existing = await this.repo.findPublisherById(schoolId, id);
    if (!existing) throw new LxpPublisherNotFoundError(id);
    const approved = await this.repo.approvePublisher(id);
    if (!approved) throw new LxpPublisherApproveError();
    return approved;
  }

  async getPublisherStats(schoolId: string, id: string): Promise<{ totalRevenue: number; totalSales: number; averageRating: number }> {
    const existing = await this.repo.findPublisherById(schoolId, id);
    if (!existing) throw new LxpPublisherNotFoundError(id);
    return this.repo.getPublisherStats(id);
  }
}
