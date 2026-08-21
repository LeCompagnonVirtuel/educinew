import type { SupabaseClient } from '@supabase/supabase-js';
import type { Topic, TopicCreate } from '@educi/types';
import { LxpTopicNotFoundError, LxpTopicCreateError, LxpTopicUpdateError, LxpTopicDeleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpTopicService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getTopic(schoolId: string, id: string): Promise<Topic> {
    const topic = await this.repo.findTopicById(schoolId, id);
    if (!topic) throw new LxpTopicNotFoundError(id);
    return topic;
  }

  async listTopics(schoolId: string): Promise<readonly Topic[]> {
    return this.repo.findTopics(schoolId);
  }

  async createTopic(data: TopicCreate): Promise<Topic> {
    const created = await this.repo.createTopic(data);
    if (!created) throw new LxpTopicCreateError();
    return created;
  }

  async updateTopic(schoolId: string, id: string, data: Partial<TopicCreate>): Promise<Topic> {
    const existing = await this.repo.findTopicById(schoolId, id);
    if (!existing) throw new LxpTopicNotFoundError(id);
    const updated = await this.repo.updateTopic(id, data);
    if (!updated) throw new LxpTopicUpdateError();
    return updated;
  }

  async deleteTopic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTopicById(schoolId, id);
    if (!existing) throw new LxpTopicNotFoundError(id);
    const deleted = await this.repo.deleteTopic(id);
    if (!deleted) throw new LxpTopicDeleteError();
  }
}
