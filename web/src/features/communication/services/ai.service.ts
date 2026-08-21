import type { CommunicationRepositoryExtended } from '@/features/communication/types';
import {
  AISummaryError,
  AITranslationError,
  AICorrectionError,
  AIResponseError,
  AIMeetingSummaryError,
  AISpamDetectionError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createAiService(repository: CommunicationRepositoryExtended) {
  return {
    async generateSummary(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.content) throw new Error('content to summarize is required');

        logger.info('Generating AI summary', { schoolId, userId }, 'AiService');

        const summary = await repository.generateSummary({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'ai.summary_generated', { userId });

        logger.info('AI summary generated', { schoolId }, 'AiService');

        return summary;
      } catch (error) {
        logger.error('Failed to generate AI summary', { schoolId }, 'AiService');
        throw error;
      }
    },

    async translateText(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.text) throw new Error('text to translate is required');
        if (!data.targetLanguage) throw new Error('targetLanguage is required');

        logger.info('Translating text with AI', { schoolId, userId, targetLanguage: data.targetLanguage }, 'AiService');

        const translation = await repository.translateText({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'ai.text_translated', { userId });

        logger.info('AI text translation completed', { schoolId }, 'AiService');

        return translation;
      } catch (error) {
        logger.error('Failed to translate text with AI', { schoolId }, 'AiService');
        throw error;
      }
    },

    async correctText(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.text) throw new Error('text to correct is required');

        logger.info('Correcting text with AI', { schoolId, userId }, 'AiService');

        const correction = await repository.correctText({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'ai.text_corrected', { userId });

        logger.info('AI text correction completed', { schoolId }, 'AiService');

        return correction;
      } catch (error) {
        logger.error('Failed to correct text with AI', { schoolId }, 'AiService');
        throw error;
      }
    },

    async suggestResponse(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.context) throw new Error('context for response suggestion is required');

        logger.info('Suggesting AI response', { schoolId, userId }, 'AiService');

        const suggestion = await repository.suggestResponse({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'ai.response_suggested', { userId });

        logger.info('AI response suggested', { schoolId }, 'AiService');

        return suggestion;
      } catch (error) {
        logger.error('Failed to suggest AI response', { schoolId }, 'AiService');
        throw error;
      }
    },

    async generateMeetingSummary(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.transcript) throw new Error('meeting transcript is required');

        logger.info('Generating meeting summary', { schoolId, userId }, 'AiService');

        const summary = await repository.generateMeetingSummary({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'ai.meeting_summary_generated', { userId });

        logger.info('Meeting summary generated', { schoolId }, 'AiService');

        return summary;
      } catch (error) {
        logger.error('Failed to generate meeting summary', { schoolId }, 'AiService');
        throw error;
      }
    },

    async detectSpam(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.content) throw new Error('content to check for spam is required');

        logger.info('Detecting spam with AI', { schoolId, userId }, 'AiService');

        const detection = await repository.detectSpam({
          ...data,
          schoolId,
          userId,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'ai.spam_detected', { userId });

        logger.info('Spam detection completed', { schoolId }, 'AiService');

        return detection;
      } catch (error) {
        logger.error('Failed to detect spam', { schoolId }, 'AiService');
        throw error;
      }
    },
  };
}
