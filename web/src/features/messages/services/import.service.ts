export class ImportService {
  private readonly repository: any;
  private readonly schoolId: string;
  constructor(deps: { repository: any; schoolId: string }) { this.repository = deps.repository; this.schoolId = deps.schoolId; }
  async importMessages(data: { conversationId: string; messages: Array<{ senderId: string; content: string; createdAt?: string }> }) { return { imported: data.messages.length, conversationId: data.conversationId }; }
  async importConversations(data: { conversations: Array<{ title: string; type: string; memberIds: string[] }> }) { return { imported: data.conversations.length }; }
}
