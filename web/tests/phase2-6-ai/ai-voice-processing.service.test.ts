import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiVoiceProcessingService } from '@/features/ai/services/ai-voice-processing.service';
import { aiRepository } from '../repositories/ai.repository';

vi.mock('@/features/repositories/ai.repository', () => ({
  aiRepository: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AiVoiceProcessingService', () => {
  let service: AiVoiceProcessingService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiVoiceProcessingService(null as any);
  });

  describe('getVoiceSession', () => {
    it('should return a voice session when found', async () => {
      const mockSession = { id: '1', userId: 'user-1', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      const result = await service.getVoiceSession('school-1', '1');
      expect(result).toEqual(mockSession);
    });

    it('should throw error when voice session not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getVoiceSession('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listVoiceSessions', () => {
    it('should return a list of voice sessions', async () => {
      const mockSessions = [{ id: '1', userId: 'user-1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockSessions as any);
      const result = await service.listVoiceSessions('school-1', {});
      expect(result).toEqual(mockSessions);
    });

    it('should return empty array when no voice sessions found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listVoiceSessions('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createVoiceSession', () => {
    it('should create a voice session and return it', async () => {
      const mockSession = { id: '1', userId: 'user-1' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockSession as any);
      const result = await service.createVoiceSession('school-1', { userId: 'user-1' } as any);
      expect(result).toEqual(mockSession);
    });
  });

  describe('updateVoiceSession', () => {
    it('should update an existing voice session', async () => {
      const mockSession = { id: '1', status: 'active' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockSession, status: 'ended' } as any);
      const result = await service.updateVoiceSession('school-1', '1', { status: 'ended' } as any);
      expect(result.status).toBe('ended');
    });

    it('should throw error when updating non-existent voice session', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateVoiceSession('school-1', 'nonexistent', { status: 'ended' } as any)).rejects.toThrow();
    });
  });

  describe('deleteVoiceSession', () => {
    it('should delete an existing voice session', async () => {
      const mockSession = { id: '1', status: 'ended' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockSession as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteVoiceSession('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent voice session', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteVoiceSession('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('transcribeAudio', () => {
    it('should transcribe audio to text', async () => {
      const mockResult = { text: 'Hello, how are you?', confidence: 0.92 };
      vi.mocked(aiRepository.transcribeAudio).mockResolvedValue(mockResult as any);
      const result = await service.transcribeAudio('school-1', { audioUrl: 'https://example.com/audio.wav' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle transcription errors gracefully', async () => {
      vi.mocked(aiRepository.transcribeAudio).mockRejectedValue(new Error('Audio too short'));
      await expect(service.transcribeAudio('school-1', { audioUrl: 'short.wav' } as any)).rejects.toThrow('Audio too short');
    });
  });

  describe('synthesizeSpeech', () => {
    it('should synthesize text to speech', async () => {
      const mockResult = { audioUrl: 'https://example.com/output.mp3', duration: 5.2 };
      vi.mocked(aiRepository.synthesizeSpeech).mockResolvedValue(mockResult as any);
      const result = await service.synthesizeSpeech('school-1', { text: 'Hello world', voice: 'female-1' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle synthesis errors gracefully', async () => {
      vi.mocked(aiRepository.synthesizeSpeech).mockRejectedValue(new Error('Text too long'));
      await expect(service.synthesizeSpeech('school-1', { text: 'x'.repeat(10000) } as any)).rejects.toThrow('Text too long');
    });
  });

  describe('detectLanguage', () => {
    it('should detect the language of audio', async () => {
      const mockResult = { language: 'en', confidence: 0.98 };
      vi.mocked(aiRepository.detectLanguage).mockResolvedValue(mockResult as any);
      const result = await service.detectLanguage('school-1', { audioUrl: 'https://example.com/audio.wav' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should throw error when detection fails', async () => {
      vi.mocked(aiRepository.detectLanguage).mockRejectedValue(new Error('Detection failed'));
      await expect(service.detectLanguage('school-1', { audioUrl: 'bad.wav' } as any)).rejects.toThrow('Detection failed');
    });
  });

  describe('analyzeSentiment', () => {
    it('should analyze sentiment of voice input', async () => {
      const mockResult = { sentiment: 'positive', score: 0.8 };
      vi.mocked(aiRepository.analyzeSentiment).mockResolvedValue(mockResult as any);
      const result = await service.analyzeSentiment('school-1', { audioUrl: 'https://example.com/audio.wav' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should throw error when sentiment analysis fails', async () => {
      vi.mocked(aiRepository.analyzeSentiment).mockRejectedValue(new Error('Analysis failed'));
      await expect(service.analyzeSentiment('school-1', { audioUrl: 'bad.wav' } as any)).rejects.toThrow('Analysis failed');
    });
  });
});
