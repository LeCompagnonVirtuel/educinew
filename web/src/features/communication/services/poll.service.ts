import type { CommunicationRepositoryExtended, Poll } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createPollService(repository: CommunicationRepositoryExtended) {
  return {
    async getPolls(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching polls', { schoolId, userId }, 'PollService');

        const polls = await repository.getPolls(schoolId, userId, filters);

        logger.info('Polls fetched', { schoolId, count: polls.length }, 'PollService');

        return polls;
      } catch (error) {
        logger.error('Failed to fetch polls', { schoolId }, 'PollService');
        throw error;
      }
    },

    async getPoll(pollId: string, userId: string) {
      try {
        if (!pollId) throw new Error('pollId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching poll', { pollId, userId }, 'PollService');

        const poll = await repository.getPoll(pollId);
        if (!poll) throw new Error('Poll not found');

        return poll;
      } catch (error) {
        logger.error('Failed to fetch poll', { pollId }, 'PollService');
        throw error;
      }
    },

    async createPoll(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.question) throw new Error('poll question is required');
        if (!data.options || data.options.length < 2) throw new Error('at least 2 options are required');

        logger.info('Creating poll', { schoolId, userId, question: data.question }, 'PollService');

        const poll = await repository.createPoll({
          ...data,
          schoolId,
          createdBy: userId,
          status: 'active',
          votes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'poll.created', { pollId: poll.id, userId });

        logger.info('Poll created', { pollId: poll.id }, 'PollService');

        return poll;
      } catch (error) {
        logger.error('Failed to create poll', { schoolId }, 'PollService');
        throw error;
      }
    },

    async votePoll(pollId: string, userId: string, optionId: string) {
      try {
        if (!pollId) throw new Error('pollId is required');
        if (!userId) throw new Error('userId is required');
        if (!optionId) throw new Error('optionId is required');

        logger.info('Voting on poll', { pollId, userId, optionId }, 'PollService');

        const poll = await repository.getPoll(pollId);
        if (!poll) throw new Error('Poll not found');
        if ((poll as any).status === 'closed') throw new Error('Poll is closed');

        const existingVote = (poll as any).votes?.find((v: any) => v.userId === userId);
        if (existingVote) throw new Error('User has already voted');

        const updated = await repository.updatePoll(pollId, {
          votes: [
            ...((poll as any).votes || []),
            { userId, optionId, votedAt: new Date().toISOString() },
          ],
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((poll as any).schoolId, 'poll.voted', { pollId, userId, optionId });

        logger.info('Poll vote recorded', { pollId, optionId }, 'PollService');

        return updated;
      } catch (error) {
        logger.error('Failed to vote on poll', { pollId }, 'PollService');
        throw error;
      }
    },

    async closePoll(pollId: string, userId: string) {
      try {
        if (!pollId) throw new Error('pollId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Closing poll', { pollId, userId }, 'PollService');

        const poll = await repository.getPoll(pollId);
        if (!poll) throw new Error('Poll not found');
        if ((poll as any).status === 'closed') throw new Error('Poll is already closed');

        const updated = await repository.updatePoll(pollId, {
          status: 'closed',
          closedAt: new Date().toISOString(),
          closedBy: userId,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((poll as any).schoolId, 'poll.closed', { pollId, userId });

        logger.info('Poll closed', { pollId }, 'PollService');

        return updated;
      } catch (error) {
        logger.error('Failed to close poll', { pollId }, 'PollService');
        throw error;
      }
    },
  };
}
