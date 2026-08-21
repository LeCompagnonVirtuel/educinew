import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class SyncService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async syncMessages(userId: string, lastSyncAt?: string) {
    logger.info('Syncing messages', { userId, lastSyncAt, schoolId: this.schoolId });
    const { data: conversations } = await this.repository.findAllConversations(this.schoolId, { limit: 100 });
    return { conversations, syncedAt: new Date().toISOString() };
  }

  async syncConversations(userId: string, lastSyncAt?: string) {
    logger.info('Syncing conversations', { userId, lastSyncAt, schoolId: this.schoolId });
    return this.repository.findAllConversations(this.schoolId, { limit: 100 });
  }

  async resolveConflict(localData: Record<string, unknown>, serverData: Record<string, unknown>) {
    logger.info('Resolving sync conflict', { schoolId: this.schoolId });
    const localDate = new Date(localData.updatedAt as string);
    const serverDate = new Date(serverData.updatedAt as string);
    return serverDate > localDate ? serverData : localData;
  }

  async getOfflineQueue(userId: string) {
    logger.info('Getting offline queue', { userId, schoolId: this.schoolId });
    return { queue: [], count: 0 };
  }

  async processOfflineQueue(userId: string) {
    logger.info('Processing offline queue', { userId, schoolId: this.schoolId });
    return { processed: 0, failed: 0 };
  }
}
