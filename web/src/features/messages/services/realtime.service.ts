import type { SupabaseMessageRepository } from '../repositories';
import { logger } from '@educi/logger';

interface RealtimeServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class RealtimeService {
  constructor(private readonly deps: RealtimeServiceDeps) {}

  async subscribeToConversation(
    conversationId: string,
    userId: string,
    callbacks: {
      onMessage?: (payload: Record<string, unknown>) => void;
      onTyping?: (payload: Record<string, unknown>) => void;
      onPresence?: (payload: Record<string, unknown>) => void;
    },
  ) {
    const supabase = (this.deps.repository as any).supabase;

    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        callbacks.onPresence?.({ event: 'sync', state });
      })
      .on('presence', { event: 'join' }, (payload: Record<string, unknown>) => {
        callbacks.onPresence?.({ event: 'join', ...payload });
      })
      .on('presence', { event: 'leave' }, (payload: Record<string, unknown>) => {
        callbacks.onPresence?.({ event: 'leave', ...payload });
      })
      .on(
        'broadcast',
        { event: 'typing' },
        (payload: Record<string, unknown>) => {
          callbacks.onTyping?.(payload);
        },
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: Record<string, unknown>) => {
          callbacks.onMessage?.(payload);
        },
      )
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    logger.info('Subscribed to conversation', { conversationId, userId }, 'messages');
    return channel;
  }

  async subscribeToNotifications(
    userId: string,
    callbacks: {
      onNotification?: (payload: Record<string, unknown>) => void;
    },
  ) {
    const supabase = (this.deps.repository as any).supabase;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload: Record<string, unknown>) => {
          callbacks.onNotification?.(payload);
        },
      )
      .subscribe();

    logger.info('Subscribed to notifications', { userId }, 'messages');
    return channel;
  }

  async sendTypingIndicator(conversationId: string, userId: string) {
    const supabase = (this.deps.repository as any).supabase;

    const channel = supabase.channel(`conversation:${conversationId}`);
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: userId,
        conversation_id: conversationId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  async updatePresence(conversationId: string, userId: string, status: string) {
    const supabase = (this.deps.repository as any).supabase;

    const channel = supabase.channel(`conversation:${conversationId}`);
    await channel.track({
      user_id: userId,
      status,
      updated_at: new Date().toISOString(),
    });
  }

  async broadcastPresence(conversationId: string, userId: string, status: string) {
    const supabase = (this.deps.repository as any).supabase;

    const channel = supabase.channel(`conversation:${conversationId}`);
    await channel.send({
      type: 'broadcast',
      event: 'presence',
      payload: {
        user_id: userId,
        status,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
