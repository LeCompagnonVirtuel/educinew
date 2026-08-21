import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCollaborationService } from '../../src/features/communication/services/collaboration.service';

const mockRepository = {
  startCollaborationSession: vi.fn(),
  getCollaborationSession: vi.fn(),
  updateCollaborationSession: vi.fn(),
  getCollaborationSessions: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('CollaborationService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create CollaborationService with all methods', () => {
    const service = createCollaborationService(mockRepository as any);
    expect(typeof service.startCollaborationSession).toBe('function');
    expect(typeof service.updateCollaborationPresence).toBe('function');
    expect(typeof service.endCollaborationSession).toBe('function');
    expect(typeof service.getCollaborationSessions).toBe('function');
    expect(typeof service.getActiveCollaborators).toBe('function');
  });

  it('should start a collaboration session', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.startCollaborationSession.mockResolvedValue({ id: 's1', status: 'active' });
    const result = await service.startCollaborationSession('school1', 'user1', { documentId: 'doc1' });
    expect(result.status).toBe('active');
  });

  it('should throw if documentId missing for startCollaborationSession', async () => {
    const service = createCollaborationService(mockRepository as any);
    await expect(service.startCollaborationSession('school1', 'user1', {})).rejects.toThrow('documentId is required');
  });

  it('should update collaboration presence', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSession.mockResolvedValue({ id: 's1', participants: [{ userId: 'user1', cursor: null }] });
    mockRepository.updateCollaborationSession.mockResolvedValue({ id: 's1', participants: [{ userId: 'user1', cursor: { line: 10 } }] });
    const result = await service.updateCollaborationPresence('s1', 'user1', { cursor: { line: 10 } });
    expect(result).toBeDefined();
  });

  it('should throw if session not found for updateCollaborationPresence', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSession.mockResolvedValue(null);
    await expect(service.updateCollaborationPresence('s1', 'user1', { cursor: {} })).rejects.toThrow();
  });

  it('should end a collaboration session', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSession.mockResolvedValue({ id: 's1', schoolId: 'school1' });
    mockRepository.updateCollaborationSession.mockResolvedValue({ id: 's1', status: 'ended' });
    const result = await service.endCollaborationSession('s1', 'user1');
    expect(result.status).toBe('ended');
  });

  it('should throw if session not found for endCollaborationSession', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSession.mockResolvedValue(null);
    await expect(service.endCollaborationSession('s1', 'user1')).rejects.toThrow();
  });

  it('should get collaboration sessions', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSessions.mockResolvedValue([{ id: 's1' }]);
    const result = await service.getCollaborationSessions('school1', 'user1');
    expect(result).toEqual([{ id: 's1' }]);
  });

  it('should get active collaborators', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSessions.mockResolvedValue([
      { id: 's1', participants: [{ userId: 'u1', leftAt: null }, { userId: 'u2', leftAt: '2024-01-01' }] }
    ]);
    const result = await service.getActiveCollaborators('school1', 'doc1');
    expect(result).toHaveLength(1);
  });

  it('should throw if sessionId missing for updateCollaborationPresence', async () => {
    const service = createCollaborationService(mockRepository as any);
    await expect(service.updateCollaborationPresence('', 'user1', { cursor: {} })).rejects.toThrow('sessionId is required');
  });

  it('should throw if userId missing for updateCollaborationPresence', async () => {
    const service = createCollaborationService(mockRepository as any);
    await expect(service.updateCollaborationPresence('s1', '', { cursor: {} })).rejects.toThrow('userId is required');
  });

  it('should throw if presence missing for updateCollaborationPresence', async () => {
    const service = createCollaborationService(mockRepository as any);
    await expect(service.updateCollaborationPresence('s1', 'user1', undefined)).rejects.toThrow('presence data is required');
  });

  it('should throw if sessionId missing for endCollaborationSession', async () => {
    const service = createCollaborationService(mockRepository as any);
    await expect(service.endCollaborationSession('', 'user1')).rejects.toThrow('sessionId is required');
  });

  it('should throw if documentId missing for getActiveCollaborators', async () => {
    const service = createCollaborationService(mockRepository as any);
    await expect(service.getActiveCollaborators('school1', '')).rejects.toThrow('documentId is required');
  });

  it('should handle getCollaborationSessions with filters', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSessions.mockResolvedValue([]);
    await service.getCollaborationSessions('school1', 'user1', { status: 'active' });
    expect(mockRepository.getCollaborationSessions).toHaveBeenCalledWith('school1', 'user1', { status: 'active' });
  });

  it('should log event on startCollaborationSession', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.startCollaborationSession.mockResolvedValue({ id: 's1' });
    await service.startCollaborationSession('school1', 'user1', { documentId: 'doc1' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'collaboration.session_started', expect.any(Object));
  });

  it('should log event on endCollaborationSession', async () => {
    const service = createCollaborationService(mockRepository as any);
    mockRepository.getCollaborationSession.mockResolvedValue({ id: 's1', schoolId: 'school1' });
    mockRepository.updateCollaborationSession.mockResolvedValue({ id: 's1' });
    await service.endCollaborationSession('s1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'collaboration.session_ended', expect.any(Object));
  });
});
