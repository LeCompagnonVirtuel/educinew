import { MobileMessageRepository } from '../repositories/message.repository';

export class MobileMessageService {
  private readonly repository: MobileMessageRepository;
  private readonly schoolId: string;

  constructor({ repository, schoolId }: { repository: MobileMessageRepository; schoolId: string }) {
    this.repository = repository;
    this.schoolId = schoolId;
  }

  async findConversation(id: string) {
    return this.repository.findConversation(id);
  }

  async findAllConversations(params?: Record<string, unknown>) {
    return this.repository.findAllConversations(this.schoolId, params);
  }

  async createConversation(payload: Record<string, unknown>) {
    return this.repository.createConversation({ ...payload, school_id: this.schoolId });
  }

  async updateConversation(id: string, payload: Record<string, unknown>) {
    return this.repository.updateConversation(id, payload);
  }

  async deleteConversation(id: string) {
    return this.repository.deleteConversation(id);
  }

  async archiveConversation(id: string) {
    return this.repository.archiveConversation(id);
  }

  async findMessages(conversationId: string, params?: Record<string, unknown>) {
    return this.repository.findMessages(conversationId, params);
  }

  async createMessage(payload: Record<string, unknown>) {
    return this.repository.createMessage({ ...payload, school_id: this.schoolId });
  }

  async updateMessage(id: string, payload: Record<string, unknown>) {
    return this.repository.updateMessage(id, payload);
  }

  async deleteMessage(id: string) {
    return this.repository.deleteMessage(id);
  }

  async searchMessages(query: string, params?: Record<string, unknown>) {
    return this.repository.searchMessages(this.schoolId, query, params);
  }

  async addReaction(messageId: string, userId: string, emoji: string) {
    return this.repository.addReaction(messageId, userId, emoji);
  }

  async removeReaction(messageId: string, userId: string, emoji: string) {
    return this.repository.removeReaction(messageId, userId, emoji);
  }

  async markAsRead(messageId: string, userId: string) {
    return this.repository.markAsRead(messageId, userId);
  }

  async markConversationAsRead(conversationId: string, userId: string) {
    return this.repository.markConversationAsRead(conversationId, userId);
  }

  async getUnreadCount(conversationId: string, userId: string) {
    return this.repository.getUnreadCount(conversationId, userId);
  }

  async findNotifications(userId: string, params?: Record<string, unknown>) {
    return this.repository.findNotifications(userId, params);
  }

  async createNotification(payload: Record<string, unknown>) {
    return this.repository.createNotification({ ...payload, school_id: this.schoolId });
  }

  async markNotificationAsRead(id: string) {
    return this.repository.markNotificationAsRead(id);
  }

  async findGroups() {
    return this.repository.findGroups(this.schoolId);
  }

  async createGroup(payload: Record<string, unknown>) {
    return this.repository.createGroup({ ...payload, school_id: this.schoolId });
  }

  async findAnnouncements(params?: Record<string, unknown>) {
    return this.repository.findAnnouncements(this.schoolId, params);
  }

  async createAnnouncement(payload: Record<string, unknown>) {
    return this.repository.createAnnouncement({ ...payload, school_id: this.schoolId });
  }

  async publishAnnouncement(id: string) {
    return this.repository.publishAnnouncement(id);
  }

  async findBroadcasts(params?: Record<string, unknown>) {
    return this.repository.findBroadcasts(this.schoolId, params);
  }

  async createBroadcast(payload: Record<string, unknown>) {
    return this.repository.createBroadcast({ ...payload, school_id: this.schoolId });
  }

  async sendBroadcast(id: string) {
    return this.repository.sendBroadcast(id);
  }

  async getMessageStatistics() {
    return this.repository.getMessageStatistics(this.schoolId);
  }

  async getDashboard() {
    return this.repository.getDashboard(this.schoolId);
  }

  async logAudit(payload: Record<string, unknown>) {
    return this.repository.logAudit({ ...payload, school_id: this.schoolId });
  }

  async getAuditLog(params?: Record<string, unknown>) {
    return this.repository.getAuditLog(this.schoolId, params);
  }
}
