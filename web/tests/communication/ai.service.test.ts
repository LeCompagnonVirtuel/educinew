import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAiService } from '../../src/features/communication/services/ai.service';

const mockRepository = {
  generateSummary: vi.fn(),
  translateText: vi.fn(),
  correctText: vi.fn(),
  suggestResponse: vi.fn(),
  generateMeetingSummary: vi.fn(),
  detectSpam: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('AiService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create AiService with all methods', () => {
    const service = createAiService(mockRepository as any);
    expect(typeof service.generateSummary).toBe('function');
    expect(typeof service.translateText).toBe('function');
    expect(typeof service.correctText).toBe('function');
    expect(typeof service.suggestResponse).toBe('function');
    expect(typeof service.generateMeetingSummary).toBe('function');
    expect(typeof service.detectSpam).toBe('function');
  });

  it('should generate summary', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.generateSummary.mockResolvedValue({ summary: 'Test summary' });
    const result = await service.generateSummary('school1', 'user1', { content: 'Long text' });
    expect(result.summary).toBe('Test summary');
  });

  it('should throw if content missing for generateSummary', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.generateSummary('school1', 'user1', {})).rejects.toThrow('content to summarize is required');
  });

  it('should translate text', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.translateText.mockResolvedValue({ translation: 'Bonjour' });
    const result = await service.translateText('school1', 'user1', { text: 'Hello', targetLanguage: 'fr' });
    expect(result.translation).toBe('Bonjour');
  });

  it('should throw if text missing for translateText', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.translateText('school1', 'user1', { targetLanguage: 'fr' })).rejects.toThrow('text to translate is required');
  });

  it('should throw if targetLanguage missing for translateText', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.translateText('school1', 'user1', { text: 'Hello' })).rejects.toThrow('targetLanguage is required');
  });

  it('should correct text', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.correctText.mockResolvedValue({ corrected: 'Corrected text' });
    const result = await service.correctText('school1', 'user1', { text: 'Wrong tect' });
    expect(result.corrected).toBe('Corrected text');
  });

  it('should throw if text missing for correctText', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.correctText('school1', 'user1', {})).rejects.toThrow('text to correct is required');
  });

  it('should suggest response', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.suggestResponse.mockResolvedValue({ suggestion: 'Thanks for the update' });
    const result = await service.suggestResponse('school1', 'user1', { context: 'User asked a question' });
    expect(result.suggestion).toBe('Thanks for the update');
  });

  it('should throw if context missing for suggestResponse', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.suggestResponse('school1', 'user1', {})).rejects.toThrow('context for response suggestion is required');
  });

  it('should generate meeting summary', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.generateMeetingSummary.mockResolvedValue({ summary: 'Meeting summary' });
    const result = await service.generateMeetingSummary('school1', 'user1', { transcript: 'Full transcript' });
    expect(result.summary).toBe('Meeting summary');
  });

  it('should throw if transcript missing for generateMeetingSummary', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.generateMeetingSummary('school1', 'user1', {})).rejects.toThrow('meeting transcript is required');
  });

  it('should detect spam', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.detectSpam.mockResolvedValue({ isSpam: false, confidence: 0.1 });
    const result = await service.detectSpam('school1', 'user1', { content: 'Normal message' });
    expect(result.isSpam).toBe(false);
  });

  it('should throw if content missing for detectSpam', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.detectSpam('school1', 'user1', {})).rejects.toThrow('content to check for spam is required');
  });

  it('should throw if schoolId missing', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.generateSummary('', 'user1', { content: 'x' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing', async () => {
    const service = createAiService(mockRepository as any);
    await expect(service.generateSummary('school1', '', { content: 'x' })).rejects.toThrow('userId is required');
  });

  it('should handle generateSummary error', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.generateSummary.mockRejectedValue(new Error('AI error'));
    await expect(service.generateSummary('school1', 'user1', { content: 'x' })).rejects.toThrow('AI error');
  });

  it('should handle translateText error', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.translateText.mockRejectedValue(new Error('AI error'));
    await expect(service.translateText('school1', 'user1', { text: 'Hi', targetLanguage: 'fr' })).rejects.toThrow('AI error');
  });

  it('should handle correctText error', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.correctText.mockRejectedValue(new Error('AI error'));
    await expect(service.correctText('school1', 'user1', { text: 'Hi' })).rejects.toThrow('AI error');
  });

  it('should handle suggestResponse error', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.suggestResponse.mockRejectedValue(new Error('AI error'));
    await expect(service.suggestResponse('school1', 'user1', { context: 'x' })).rejects.toThrow('AI error');
  });

  it('should handle generateMeetingSummary error', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.generateMeetingSummary.mockRejectedValue(new Error('AI error'));
    await expect(service.generateMeetingSummary('school1', 'user1', { transcript: 'x' })).rejects.toThrow('AI error');
  });

  it('should handle detectSpam error', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.detectSpam.mockRejectedValue(new Error('AI error'));
    await expect(service.detectSpam('school1', 'user1', { content: 'x' })).rejects.toThrow('AI error');
  });

  it('should log event on generateSummary', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.generateSummary.mockResolvedValue({ summary: 'x' });
    await service.generateSummary('school1', 'user1', { content: 'x' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'ai.summary_generated', expect.any(Object));
  });

  it('should log event on translateText', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.translateText.mockResolvedValue({ translation: 'x' });
    await service.translateText('school1', 'user1', { text: 'Hi', targetLanguage: 'fr' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'ai.text_translated', expect.any(Object));
  });

  it('should log event on correctText', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.correctText.mockResolvedValue({ corrected: 'x' });
    await service.correctText('school1', 'user1', { text: 'Hi' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'ai.text_corrected', expect.any(Object));
  });

  it('should log event on suggestResponse', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.suggestResponse.mockResolvedValue({ suggestion: 'x' });
    await service.suggestResponse('school1', 'user1', { context: 'x' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'ai.response_suggested', expect.any(Object));
  });

  it('should log event on generateMeetingSummary', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.generateMeetingSummary.mockResolvedValue({ summary: 'x' });
    await service.generateMeetingSummary('school1', 'user1', { transcript: 'x' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'ai.meeting_summary_generated', expect.any(Object));
  });

  it('should log event on detectSpam', async () => {
    const service = createAiService(mockRepository as any);
    mockRepository.detectSpam.mockResolvedValue({ isSpam: false });
    await service.detectSpam('school1', 'user1', { content: 'x' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'ai.spam_detected', expect.any(Object));
  });
});
