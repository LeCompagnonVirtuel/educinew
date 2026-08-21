import { logger } from '@educi/logger';
import type { SupabaseMessageRepository } from '../repositories/message.repository';

export class ValidationService {
  private readonly repository: SupabaseMessageRepository;
  private readonly schoolId: string;
  constructor(deps: { repository: SupabaseMessageRepository; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }

  async validateMessage(content: string, conversationId: string) {
    logger.info('Validating message', { conversationId, schoolId: this.schoolId });
    if (!content || content.trim().length === 0) return { valid: false, error: 'Message content is required' };
    if (content.length > 10000) return { valid: false, error: 'Message too long' };
    const conversation = await this.repository.findConversation(conversationId);
    if (!conversation) return { valid: false, error: 'Conversation not found' };
    if (conversation.isArchived) return { valid: false, error: 'Conversation is archived' };
    return { valid: true };
  }

  async validateConversation(type: string, title: string, memberIds: string[]) {
    logger.info('Validating conversation', { type, title, schoolId: this.schoolId });
    if (!title || title.trim().length === 0) return { valid: false, error: 'Title is required' };
    if (title.length > 200) return { valid: false, error: 'Title too long' };
    if (!memberIds || memberIds.length === 0) return { valid: false, error: 'At least one member is required' };
    return { valid: true };
  }

  async validateAttachment(fileName: string, fileSize: number, mimeType: string) {
    logger.info('Validating attachment', { fileName, fileSize, mimeType });
    if (fileSize > 26214400) return { valid: false, error: 'File too large' };
    const allowedTypes = ['image/', 'application/pdf', 'video/', 'audio/', 'application/zip', 'application/msword', 'application/vnd.'];
    if (!allowedTypes.some((t) => mimeType.startsWith(t) || mimeType.includes(t))) return { valid: false, error: 'Unsupported file type' };
    return { valid: true };
  }

  async validateBroadcast(title: string, content: string, scope: string) {
    logger.info('Validating broadcast', { title, scope, schoolId: this.schoolId });
    if (!title || title.trim().length === 0) return { valid: false, error: 'Title is required' };
    if (!content || content.trim().length === 0) return { valid: false, error: 'Content is required' };
    return { valid: true };
  }
}
