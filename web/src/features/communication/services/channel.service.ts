import type { CommunicationRepositoryExtended, Channel } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createChannelService(repository: CommunicationRepositoryExtended) {
  return {
    async getChannels(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching channels', { schoolId, userId }, 'ChannelService');

        const channels = await repository.getChannels(schoolId, userId, filters);

        logger.info('Channels fetched', { schoolId, count: channels.length }, 'ChannelService');

        return channels;
      } catch (error) {
        logger.error('Failed to fetch channels', { schoolId }, 'ChannelService');
        throw error;
      }
    },

    async getChannel(channelId: string, userId: string) {
      try {
        if (!channelId) throw new Error('channelId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching channel', { channelId, userId }, 'ChannelService');

        const channel = await repository.getChannel(channelId);
        if (!channel) throw new Error('Channel not found');

        return channel;
      } catch (error) {
        logger.error('Failed to fetch channel', { channelId }, 'ChannelService');
        throw error;
      }
    },

    async createChannel(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('channel name is required');

        logger.info('Creating channel', { schoolId, userId, name: data.name }, 'ChannelService');

        const channel = await repository.createChannel({
          ...data,
          schoolId,
          createdBy: userId,
          members: [{ userId, role: 'admin', joinedAt: new Date().toISOString() }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'channel.created', { channelId: channel.id, userId });

        logger.info('Channel created', { channelId: channel.id }, 'ChannelService');

        return channel;
      } catch (error) {
        logger.error('Failed to create channel', { schoolId }, 'ChannelService');
        throw error;
      }
    },

    async updateChannel(channelId: string, userId: string, data: any) {
      try {
        if (!channelId) throw new Error('channelId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating channel', { channelId, userId }, 'ChannelService');

        const existing = await repository.getChannel(channelId);
        if (!existing) throw new Error('Channel not found');

        const updated = await repository.updateChannel(channelId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'channel.updated', { channelId, userId });

        logger.info('Channel updated', { channelId }, 'ChannelService');

        return updated;
      } catch (error) {
        logger.error('Failed to update channel', { channelId }, 'ChannelService');
        throw error;
      }
    },

    async deleteChannel(channelId: string, userId: string) {
      try {
        if (!channelId) throw new Error('channelId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting channel', { channelId, userId }, 'ChannelService');

        const existing = await repository.getChannel(channelId);
        if (!existing) throw new Error('Channel not found');

        await repository.deleteChannel(channelId);

        await repository.logCommunicationEvent((existing as any).schoolId, 'channel.deleted', { channelId, userId });

        logger.info('Channel deleted', { channelId }, 'ChannelService');
      } catch (error) {
        logger.error('Failed to delete channel', { channelId }, 'ChannelService');
        throw error;
      }
    },
  };
}
