import { sbMessaging } from './supabase-client';
import { sbEmailTrigger } from './domains/email-trigger.service';
import { createClient } from '@/lib/supabase/client';

export const messagingApi = {
  getInbox() {
    return sbMessaging.getInbox() as Promise<any[]>;
  },

  getConversation(userId: string) {
    return sbMessaging.getConversation(userId) as Promise<any[]>;
  },

  async sendMessage(receiverId: string, content: string) {
    const result = await sbMessaging.send(receiverId, content) as any;
    if (result && receiverId) {
      const senderName = result.sender_name || '';
      // Email notification handled by backend webhook
    }
    return result;
  },

  getAnnouncements(_schoolId?: string) {
    return sbMessaging.getAnnouncements(_schoolId) as Promise<any[]>;
  },

  async createAnnouncement(data: any) {
    return sbMessaging.createAnnouncement(data);
  },

  deleteAnnouncement(id: string) {
    return sbMessaging.removeAnnouncement(id) as Promise<any>;
  },
};
