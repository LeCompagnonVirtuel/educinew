import type { SupabaseMessageRepository } from '../repositories';
import {
  messageSearchSchema,
  conversationSearchSchema,
  searchFilterSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface SearchServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class SearchService {
  constructor(private readonly deps: SearchServiceDeps) {}

  async searchMessages(search: Record<string, unknown>) {
    const parsed = messageSearchSchema.parse(search);
    return this.deps.repository.searchMessages(this.deps.schoolId, parsed as any);
  }

  async searchConversations(search: Record<string, unknown>) {
    const parsed = conversationSearchSchema.parse(search);
    return this.deps.repository.findAllConversations(this.deps.schoolId, {
      search: parsed.query,
      isArchived: parsed.isArchived,
      limit: parsed.limit,
    } as any);
  }

  async searchUsers(query: string) {
    if (query.length < 2) return [];
    const extended = this.deps.repository as any;
    if (typeof extended.findUsers === 'function') {
      return extended.findUsers([]);
    }
    return [];
  }

  async globalSearch(search: Record<string, unknown>) {
    const parsed = searchFilterSchema.parse(search);
    const types = parsed.types || ['CONVERSATION', 'MESSAGE', 'ANNOUNCEMENT', 'BROADCAST'];
    const results: Record<string, unknown[]> = {};

    if (types.includes('CONVERSATION')) {
      const conversations = await this.deps.repository.findAllConversations(this.deps.schoolId, {
        search: parsed.query,
        limit: parsed.limit,
        offset: parsed.offset,
      } as any);
      results.conversations = conversations.data;
    }

    if (types.includes('MESSAGE')) {
      const messages = await this.deps.repository.searchMessages(this.deps.schoolId, {
        query: parsed.query,
        limit: parsed.limit,
        offset: parsed.offset,
      } as any);
      results.messages = messages.data;
    }

    if (types.includes('ANNOUNCEMENT')) {
      const announcements = await this.deps.repository.findAnnouncements(this.deps.schoolId, {
        search: parsed.query,
        limit: parsed.limit,
        offset: parsed.offset,
      } as any);
      results.announcements = announcements.data;
    }

    if (types.includes('BROADCAST')) {
      const broadcasts = await this.deps.repository.findBroadcasts(this.deps.schoolId, {
        search: parsed.query,
        limit: parsed.limit,
        offset: parsed.offset,
      } as any);
      results.broadcasts = broadcasts.data;
    }

    logger.info('Global search performed', { query: parsed.query, types }, 'messages');
    return results;
  }
}
