import type { SupabaseMessageRepository } from '../repositories';
import { addReactionSchema } from '../validators/schemas';
import { logger } from '@educi/logger';

interface ReactionServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class ReactionService {
  constructor(private readonly deps: ReactionServiceDeps) {}

  async findReactions(messageId: string) {
    const message = await this.deps.repository.findMessage(messageId);
    if (!message) throw new Error('Message not found');
    return this.deps.repository.findMessageReactions(messageId);
  }

  async addReaction(messageId: string, userId: string, type: string) {
    const message = await this.deps.repository.findMessage(messageId);
    if (!message) throw new Error('Message not found');
    const parsed = addReactionSchema.parse({ messageId, type });
    return this.deps.repository.addReaction(parsed.messageId, userId, parsed.type);
  }

  async removeReaction(messageId: string, userId: string) {
    const message = await this.deps.repository.findMessage(messageId);
    if (!message) throw new Error('Message not found');
    await this.deps.repository.removeReaction(messageId, userId);
    logger.info('Reaction removed', { messageId, userId }, 'messages');
  }

  async getReactionCounts(messageId: string) {
    const reactions = await this.deps.repository.findMessageReactions(messageId);
    const counts: Record<string, number> = {};
    for (const reaction of reactions) {
      counts[reaction.type] = (counts[reaction.type] || 0) + 1;
    }
    return { counts, total: reactions.length, reactions };
  }
}
