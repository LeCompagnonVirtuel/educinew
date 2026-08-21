import type { CommunicationRepositoryExtended, Call } from '@/features/communication/types';
import {
  CallNotFoundError,
  CallAlreadyActiveError,
  CallNotActiveError,
  CallParticipantNotFoundError,
  CallRecordingError,
  CallPermissionError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCallService(repository: CommunicationRepositoryExtended) {
  return {
    async getCalls(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching calls', { schoolId, userId }, 'CallService');

        const calls = await repository.getCalls(schoolId, userId, filters);

        logger.info('Calls fetched', { schoolId, count: calls.length }, 'CallService');

        return calls;
      } catch (error) {
        logger.error('Failed to fetch calls', { schoolId }, 'CallService');
        throw error;
      }
    },

    async getCall(callId: string, userId: string) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching call', { callId, userId }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        return call;
      } catch (error) {
        logger.error('Failed to fetch call', { callId }, 'CallService');
        throw error;
      }
    },

    async initiateCall(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.type) throw new Error('call type is required');

        logger.info('Initiating call', { schoolId, userId, type: data.type }, 'CallService');

        const call = await repository.createCall({
          ...data,
          schoolId,
          initiatedBy: userId,
          status: 'ringing',
          participants: [{ userId, joinedAt: new Date().toISOString(), isMuted: false, isVideoOn: false }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'call.initiated', { callId: call.id, userId, type: data.type });

        logger.info('Call initiated', { callId: call.id }, 'CallService');

        return call;
      } catch (error) {
        logger.error('Failed to initiate call', { schoolId }, 'CallService');
        throw error;
      }
    },

    async joinCall(callId: string, userId: string) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Joining call', { callId, userId }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);
        if (call.status === 'ended') throw new CallNotActiveError(callId);

        const alreadyParticipant = (call.participants || []).some((p: any) => p.userId === userId);
        if (alreadyParticipant) throw new CallAlreadyActiveError(callId);

        const updated = await repository.updateCall(callId, {
          participants: [
            ...(call.participants || []),
            { userId, joinedAt: new Date().toISOString(), isMuted: false, isVideoOn: false },
          ],
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(call.schoolId, 'call.joined', { callId, userId });

        logger.info('Call joined', { callId, userId }, 'CallService');

        return updated;
      } catch (error) {
        logger.error('Failed to join call', { callId }, 'CallService');
        throw error;
      }
    },

    async leaveCall(callId: string, userId: string) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Leaving call', { callId, userId }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const participant = (call.participants || []).find((p: any) => p.userId === userId);
        if (!participant) throw new CallParticipantNotFoundError(userId);

        const updated = await repository.updateCall(callId, {
          participants: (call.participants || []).map((p: any) =>
            p.userId === userId ? { ...p, leftAt: new Date().toISOString() } : p
          ),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(call.schoolId, 'call.left', { callId, userId });

        logger.info('Call left', { callId, userId }, 'CallService');

        return updated;
      } catch (error) {
        logger.error('Failed to leave call', { callId }, 'CallService');
        throw error;
      }
    },

    async endCall(callId: string, userId: string) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Ending call', { callId, userId }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const updated = await repository.updateCall(callId, {
          status: 'ended',
          endedAt: new Date().toISOString(),
          endedBy: userId,
          duration: call.startedAt
            ? Math.floor((Date.now() - new Date(call.startedAt).getTime()) / 1000)
            : 0,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(call.schoolId, 'call.ended', { callId, userId });

        logger.info('Call ended', { callId }, 'CallService');

        return updated;
      } catch (error) {
        logger.error('Failed to end call', { callId }, 'CallService');
        throw error;
      }
    },

    async muteCallParticipant(callId: string, userId: string, participantId: string, muted: boolean) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');
        if (!participantId) throw new Error('participantId is required');

        logger.info('Toggling mute on call participant', { callId, userId, participantId, muted }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const participant = (call.participants || []).find((p: any) => p.userId === participantId);
        if (!participant) throw new CallParticipantNotFoundError(participantId);

        const updated = await repository.updateCall(callId, {
          participants: (call.participants || []).map((p: any) =>
            p.userId === participantId ? { ...p, isMuted: muted } : p
          ),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Call participant mute toggled', { callId, participantId, muted }, 'CallService');

        return updated;
      } catch (error) {
        logger.error('Failed to mute call participant', { callId }, 'CallService');
        throw error;
      }
    },

    async toggleVideo(callId: string, userId: string, videoOn: boolean) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Toggling video on call', { callId, userId, videoOn }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const participant = (call.participants || []).find((p: any) => p.userId === userId);
        if (!participant) throw new CallParticipantNotFoundError(userId);

        const updated = await repository.updateCall(callId, {
          participants: (call.participants || []).map((p: any) =>
            p.userId === userId ? { ...p, isVideoOn: videoOn } : p
          ),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Call video toggled', { callId, videoOn }, 'CallService');

        return updated;
      } catch (error) {
        logger.error('Failed to toggle video', { callId }, 'CallService');
        throw error;
      }
    },

    async toggleScreenShare(callId: string, userId: string, sharing: boolean) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Toggling screen share on call', { callId, userId, sharing }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const participant = (call.participants || []).find((p: any) => p.userId === userId);
        if (!participant) throw new CallParticipantNotFoundError(userId);

        const updated = await repository.updateCall(callId, {
          participants: (call.participants || []).map((p: any) =>
            p.userId === userId ? { ...p, isScreenSharing: sharing } : p
          ),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Call screen share toggled', { callId, sharing }, 'CallService');

        return updated;
      } catch (error) {
        logger.error('Failed to toggle screen share', { callId }, 'CallService');
        throw error;
      }
    },

    async getCallRecording(callId: string, userId: string) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching call recording', { callId, userId }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const recording = await repository.getCallRecording(callId);

        logger.info('Call recording fetched', { callId }, 'CallService');

        return recording;
      } catch (error) {
        logger.error('Failed to fetch call recording', { callId }, 'CallService');
        throw error;
      }
    },

    async getCallStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching call stats', { schoolId, dateFrom, dateTo }, 'CallService');

        const stats = await repository.getCallStats(schoolId, dateFrom, dateTo);

        logger.info('Call stats fetched', { schoolId }, 'CallService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch call stats', { schoolId }, 'CallService');
        throw error;
      }
    },

    async getCallRecordingUrl(callId: string, recordingId: string, userId: string) {
      try {
        if (!callId) throw new Error('callId is required');
        if (!recordingId) throw new Error('recordingId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching call recording URL', { callId, recordingId, userId }, 'CallService');

        const call = await repository.getCall(callId);
        if (!call) throw new CallNotFoundError(callId);

        const recording = await repository.getCallRecording(callId);
        if (!recording) throw new CallRecordingError('Recording not found');

        const url = (recording as any).url || (recording as any).downloadUrl;

        logger.info('Call recording URL fetched', { callId, recordingId }, 'CallService');

        return url;
      } catch (error) {
        logger.error('Failed to fetch call recording URL', { callId, recordingId }, 'CallService');
        throw error;
      }
    },
  };
}
