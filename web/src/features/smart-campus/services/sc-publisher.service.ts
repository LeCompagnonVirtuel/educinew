import type { SupabaseClient } from '@supabase/supabase-js';
import type { Publisher, PublisherCreate } from '@educi/types';
import { ScPublisherNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScPublisherService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getPublisher(schoolId: string, id: string): Promise<Publisher> {
    const publisher = await this.repo.findPublisherById(schoolId, id);
    if (!publisher) throw new ScPublisherNotFoundError(id);
    return publisher;
  }

  async listPublishers(schoolId: string, filters?: Record<string, unknown>): Promise<Publisher[]> {
    return this.repo.findAllPublishers(schoolId, filters);
  }

  async createPublisher(schoolId: string, data: PublisherCreate): Promise<Publisher> {
    return this.repo.createPublisher(schoolId, data);
  }

  async updatePublisher(schoolId: string, id: string, data: Partial<PublisherCreate>): Promise<Publisher> {
    const existing = await this.repo.findPublisherById(schoolId, id);
    if (!existing) throw new ScPublisherNotFoundError(id);
    return this.repo.updatePublisher(schoolId, id, data);
  }

  async deletePublisher(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPublisherById(schoolId, id);
    if (!existing) throw new ScPublisherNotFoundError(id);
    return this.repo.deletePublisher(schoolId, id);
  }

  async countPublishers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPublishers(schoolId, filters);
  }
}
